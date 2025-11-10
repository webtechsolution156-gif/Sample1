// src/pages/Checkout.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Smartphone, CheckCircle, XCircle, X, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import QRCode from 'qrcode';

export default function Checkout() {
  const { cart, clearCart, cartTotalPrice } = useCart();
  const navigate = useNavigate();

  // ---- CHANGE THESE ----
  const RECEIVER_UPI_ID = '7505266931@slc';
  const RECEIVER_NAME = 'Udit Narayan Saxena';
  const OWNER_WHATSAPP = '7505266931'; // <-- YOUR NUMBER (no +)
  // --------------------

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'cod'
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    shippingAddress: { street: '', city: '', state: '', zip: '', country: 'India' },
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [transactionId, setTransactionId] = useState(null); // NEW: Capture from UPI
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const qrCanvasRef = useRef(null);
  const pollIframeRef = useRef(null);
  const pollIntervalRef = useRef(null);

  const subtotal = cartTotalPrice;
  const shippingFee = paymentMethod === 'cod' ? 10 : 0;
  const total = subtotal + shippingFee;

  // -----------------------------------------------------------------
  // 1. VALIDATION
  // -----------------------------------------------------------------
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.firstName || !formData.lastName) newErrors.name = 'Full name required';
    if (!formData.shippingAddress.street || !formData.shippingAddress.city)
      newErrors.shipping = 'Street & city required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------------------------------------------
  // 2. ORDER ID
  // -----------------------------------------------------------------
  const generateOrderId = () => {
    const id = Math.floor(10000000 + Math.random() * 90000000).toString();
    localStorage.setItem('pendingOrderId', id);
    return id;
  };

  // -----------------------------------------------------------------
  // 3. UPI LINK (with txnid for callback)
  // -----------------------------------------------------------------
  const buildUpiLink = (orderId) => {
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/orders?status=success&orderId=${orderId}`;
    const failUrl = `${baseUrl}/checkout?status=failure&orderId=${orderId}`;

    // Generate a unique txnid (most UPI apps return it)
    const txnid = Date.now().toString(36).toUpperCase();

    return `upi://pay?pa=${RECEIVER_UPI_ID}&pn=${encodeURIComponent(
      RECEIVER_NAME
    )}&am=${total.toFixed(2)}&cu=INR&tn=Order%20${orderId}&tr=${orderId}&txnid=${txnid}&url=${encodeURIComponent(
      successUrl
    )}&ru=${encodeURIComponent(failUrl)}`;
  };

  // -----------------------------------------------------------------
  // 4. SAVE ORDER (localStorage)
  // -----------------------------------------------------------------
  const saveOrder = () => {
    const orders = JSON.parse(localStorage.getItem('confirmedOrders') || '[]');
    const newOrder = {
      orderId,
      transactionId: transactionId || 'N/A',
      amount: total,
      paymentMethod,
      customer: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone || 'N/A',
      address: `${formData.shippingAddress.street}, ${formData.shippingAddress.city}, ${formData.shippingAddress.state} ${formData.shippingAddress.zip}, ${formData.shippingAddress.country}`,
      items: cart.map((p) => ({ name: p.name, qty: p.quantity, price: p.price })),
      timestamp: new Date().toISOString(),
    };
    orders.push(newOrder);
    localStorage.setItem('confirmedOrders', JSON.stringify(orders));
  };

  // -----------------------------------------------------------------
  // 5. SEND WHATSAPP (with Transaction ID)
  // -----------------------------------------------------------------
  const sendWhatsApp = () => {
    const paymentInfo =
      paymentMethod === 'cod'
        ? '_Cash on Delivery (₹10 shipping added)_'
        : `_Payment successful via UPI (Txn: ${transactionId || 'N/A'})_`;

    const text = encodeURIComponent(
      `*New Order Received!*\n\n` +
        `Order ID: *${orderId}*\n` +
        `Transaction ID: *${transactionId || 'N/A'}*\n` +
        `Amount: *₹${total.toFixed(2)}*\n` +
        `Payment: *${paymentMethod.toUpperCase()}* ${paymentInfo}\n` +
        `Customer: *${formData.firstName} ${formData.lastName}*\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || 'Not provided'}\n` +
        `Address: ${formData.shippingAddress.street}, ${formData.shippingAddress.city}\n\n` +
        `_Items:_\n${cart
          .map((i) => `• ${i.name} × ${i.quantity} @ ₹${i.price}`)
          .join('\n')}`
    );
    const waLink = `https://wa.me/${OWNER_WHATSAPP}?text=${text}`;
    window.open(waLink, '_blank');
  };

  // -----------------------------------------------------------------
  // 6. CALLBACK LISTENER (mobile deep-link)
  // -----------------------------------------------------------------
  useEffect(() => {
    const handleCallback = () => {
      const params = new URLSearchParams(window.location.search);
      const status = params.get('status')?.toLowerCase();
      const urlOrderId = params.get('orderId');
      const txnId = params.get('txnid') || params.get('txnId') || 'N/A';

      if (status === 'success' && urlOrderId && paymentMethod === 'upi') {
        setOrderId(urlOrderId);
        setTransactionId(txnId);
        setPaymentStatus(true);
        setShowQRModal(false);
        toast.success('Payment successful!');

        saveOrder();
        sendWhatsApp();
        clearCart();
        localStorage.removeItem('pendingOrderId');

        setTimeout(() => navigate('/orders'), 2000);
      } else if (status === 'failure') {
        setPaymentStatus(false);
        toast.error('Payment failed.');
      }
    };

    handleCallback();
    window.addEventListener('popstate', handleCallback);
    return () => window.removeEventListener('popstate', handleCallback);
  }, [navigate, clearCart, paymentMethod, total, cart, formData, transactionId]);

  // -----------------------------------------------------------------
  // 7. POLLING FOR DESKTOP QR PAYMENT
  // -----------------------------------------------------------------
  const startPolling = (orderId) => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    const successUrl = `${window.location.origin}/orders?status=success&orderId=${orderId}`;

    pollIntervalRef.current = setInterval(() => {
      if (!pollIframeRef.current) return;
      try {
        const iframeDoc = pollIframeRef.current.contentDocument;
        if (iframeDoc?.location?.href?.includes(successUrl)) {
          clearInterval(pollIntervalRef.current);
          setPaymentStatus(true);
          setShowQRModal(false);
          toast.success('Payment successful!');

          saveOrder();
          sendWhatsApp();
          clearCart();
          localStorage.removeItem('pendingOrderId');

          setTimeout(() => navigate('/orders'), 2000);
        }
      } catch (e) {
        // cross-origin, ignore
      }
    }, 2000);
  };

  const stopPolling = () => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
  };

  // -----------------------------------------------------------------
  // 8. RENDER QR
  // -----------------------------------------------------------------
  const renderQR = (upiLink) => {
    if (!qrCanvasRef.current) return;
    QRCode.toCanvas(qrCanvasRef.current, upiLink, { width: 256, margin: 2 }, (err) => {
      if (err) {
        toast.error('QR generation failed');
        console.error(err);
      }
    });
  };

  // -----------------------------------------------------------------
  // 9. HANDLE COD SUBMIT
  // -----------------------------------------------------------------
  const handleCodSubmit = () => {
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    setTransactionId('COD');
    saveOrder();
    sendWhatsApp();
    clearCart();
    localStorage.removeItem('pendingOrderId');
    toast.success('Order placed! Pay ₹10 extra on delivery.');
    setTimeout(() => navigate('/orders'), 2000);
  };

  // -----------------------------------------------------------------
  // 10. HANDLE UPI SUBMIT
  // -----------------------------------------------------------------
  const handleUpiSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    const upiLink = buildUpiLink(newOrderId);

    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      // Mobile – deep link
      window.location.href = upiLink;
    } else {
      // Desktop – show QR + start polling
      setShowQRModal(true);
      setTimeout(() => renderQR(upiLink), 100);
      startPolling(newOrderId);
    }

    setTimeout(() => setIsProcessing(false), 1500);
  };

  // -----------------------------------------------------------------
  // 11. MAIN SUBMIT
  // -----------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'cod') {
      if (!validateForm()) return;
      setIsProcessing(true);
      handleCodSubmit();
      setTimeout(() => setIsProcessing(false), 1000);
    } else {
      handleUpiSubmit(e);
    }
  };

  // -----------------------------------------------------------------
  // 12. CLEANUP POLLING WHEN MODAL CLOSES
  // -----------------------------------------------------------------
  useEffect(() => {
    if (!showQRModal) stopPolling();
  }, [showQRModal]);

  // -----------------------------------------------------------------
  // 13. SUCCESS SCREEN (FULL POPUP)
  // -----------------------------------------------------------------
  if (paymentStatus === true) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center p-6 z-50">
        <CheckCircle className="w-24 h-24 text-green-500 mb-6 animate-pulse" />
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">Payment Successful!</h1>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4 border border-green-200">
          <div>
            <p className="text-lg text-gray-700">
              Order <strong className="font-mono text-xl">{orderId}</strong> confirmed.
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Transaction ID:</span>
            </p>
            <p className="font-mono text-green-700 font-bold break-all">{transactionId || 'N/A'}</p>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-600">WhatsApp message sent to shop owner.</p>
        <p className="text-gray-500 text-xs">Redirecting to your orders...</p>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // 14. FAILURE SCREEN
  // -----------------------------------------------------------------
  if (paymentStatus === false) {
    return (
      <div className="py-20 text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Failed</h1>
        <p className="mb-4">
          Order <strong className="font-mono">{orderId}</strong> pending.
        </p>
        <button
          onClick={() => {
            setPaymentStatus(null);
            setOrderId(null);
            setTransactionId(null);
            localStorage.removeItem('pendingOrderId');
            setShowQRModal(false);
            stopPolling();
          }}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // 15. MAIN CHECKOUT FORM
  // -----------------------------------------------------------------
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/cart" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          ← Back to Cart
        </Link>
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
          {/* CONTACT */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone (optional)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* SHIPPING */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <input
              type="text"
              placeholder="Street Address *"
              value={formData.shippingAddress.street}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shippingAddress: { ...formData.shippingAddress, street: e.target.value },
                })
              }
              className="w-full p-3 border rounded-lg"
              required
            />
            {errors.shipping && <p className="text-red-500 text-sm -mt-2">{errors.shipping}</p>}

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City *"
                value={formData.shippingAddress.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shippingAddress: { ...formData.shippingAddress, city: e.target.value },
                  })
                }
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="State"
                value={formData.shippingAddress.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shippingAddress: { ...formData.shippingAddress, state: e.target.value },
                  })
                }
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="ZIP Code"
                value={formData.shippingAddress.zip}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shippingAddress: { ...formData.shippingAddress, zip: e.target.value },
                  })
                }
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Country"
                value={formData.shippingAddress.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shippingAddress: { ...formData.shippingAddress, country: e.target.value },
                  })
                }
                className="w-full p-3 border rounded-lg"
                defaultValue="India"
              />
            </div>
          </div>

          {/* PAYMENT METHOD & SUMMARY */}
          <div className="lg:col-span-2 space-y-6">
            {/* PAYMENT METHOD RADIO */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <Smartphone className="w-5 h-5 text-green-600" />
                  <span>UPI (Instant)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <Package className="w-5 h-5 text-orange-600" />
                  <span>Cash on Delivery (+₹10 shipping)</span>
                </label>
              </div>
            </div>

            {/* UPI INFO */}
            {paymentMethod === 'upi' && (
              <div className="p-5 bg-green-50 border-2 border-green-200 rounded-lg text-center">
                <Smartphone className="w-8 h-8 mx-auto mb-2 text-green-700" />
                <p className="text-sm font-medium text-green-800">
                  Pay via UPI to: <span className="font-mono font-bold">{RECEIVER_UPI_ID}</span>
                </p>
                <p className="text-xs text-green-600 mt-1">Name: {RECEIVER_NAME}</p>
              </div>
            )}

            {/* ORDER SUMMARY */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  Subtotal: <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {shippingFee > 0 && (
                  <div className="flex justify-between text-orange-600">
                    Shipping (COD): <span>₹{shippingFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-green-600">
                  Tax: <span>₹0.00</span>
                </div>
              </div>
              <div className="border-t pt-3 font-bold text-lg flex justify-between">
                Total: <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {orderId && (
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm font-medium">
                  Your Order ID: <span className="font-mono font-bold">{orderId}</span>
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                isProcessing
                  ? 'bg-gray-300 cursor-not-allowed'
                  : paymentMethod === 'cod'
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing…
                </>
              ) : paymentMethod === 'cod' ? (
                'Place COD Order'
              ) : (
                'Pay with UPI'
              )}
            </button>
          </div>
        </form>

        {/* ---------- QR MODAL (UPI ONLY) ---------- */}
        {showQRModal && orderId && paymentMethod === 'upi' && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-sm w-full p-6 relative">
              <button
                onClick={() => {
                  setShowQRModal(false);
                  stopPolling();
                }}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-center mb-4">Scan to Pay</h3>

              <div className="flex justify-center mb-4">
                <canvas ref={qrCanvasRef}></canvas>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm">
                  Amount: <strong>₹{total.toFixed(2)}</strong>
                </p>
                <p className="text-sm">
                  Order: <strong className="font-mono">{orderId}</strong>
                </p>
                <p className="text-xs text-gray-600">
                  Pay to: <span className="font-mono">{RECEIVER_UPI_ID}</span>
                </p>
              </div>

              <a
                href={buildUpiLink(orderId)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full text-center bg-primary text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Open in UPI App
              </a>

              {/* Hidden iframe for polling */}
              <iframe
                ref={pollIframeRef}
                src={buildUpiLink(orderId)}
                style={{ display: 'none' }}
                title="upi-poll"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
