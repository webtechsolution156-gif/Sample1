// src/pages/Checkout.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, Smartphone, CheckCircle, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { cart, clearCart, cartTotalPrice } = useCart();
  const navigate = useNavigate();

  // YOUR RECEIVER UPI ID (CHANGE THIS TO YOUR OWN)
  const RECEIVER_UPI_ID = 'udit9407@postbank'; // <<<--- CHANGE THIS
  const RECEIVER_NAME = 'Udit Narayan Saxena';

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    shippingAddress: { street: '', city: '', state: '', zip: '', country: '' },
    paymentMethod: '', // 'card' | 'upi'
    cardDetails: { number: '', expiry: '', cvv: '' },
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const shippingCost = cartTotalPrice > 50 ? 0 : 5.99;
  const tax = cartTotalPrice * 0.08;
  const total = cartTotalPrice + shippingCost + tax;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.firstName || !formData.lastName) newErrors.name = 'Full name required';
    if (!formData.shippingAddress.street || !formData.shippingAddress.city)
      newErrors.shipping = 'Shipping address incomplete';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardDetails.number || !formData.cardDetails.expiry || !formData.cardDetails.cvv)
        newErrors.card = 'All card fields required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    if (formData.paymentMethod === 'upi') {
      // Generate UPI Deep Link
      const upiLink = `upi://pay?pa=${RECEIVER_UPI_ID}&pn=${encodeURIComponent(RECEIVER_NAME)}&am=${total.toFixed(2)}&cu=INR&tn=Order%20Payment`;

      // On mobile: open UPI app
      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        window.location.href = upiLink;
      } else {
        // On desktop: show QR code
        toast(
          <div className="text-center">
            <QrCode className="w-16 h-16 mx-auto mb-2" />
            <p className="text-sm">Scan with any UPI app</p>
            <a href={upiLink} className="text-primary underline text-xs">Click here to pay</a>
          </div>,
          { duration: 10000 }
        );
      }

      // Simulate payment success after 3 sec
      setTimeout(() => {
        clearCart();
        setOrderConfirmed(true);
        toast.success('UPI Payment initiated! Order confirmed.');
        setTimeout(() => navigate('/'), 3000);
        setIsProcessing(false);
      }, 3000);
    } else {
      // Mock card payment
      await new Promise(r => setTimeout(r, 2000));
      if (Math.random() > 0.2) {
        clearCart();
        setOrderConfirmed(true);
        toast.success('Card payment successful!');
        setTimeout(() => navigate('/'), 3000);
      } else {
        toast.error('Card declined. Try again.');
      }
      setIsProcessing(false);
    }
  };

  const paymentOptions = [
    { id: 'card', label: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'upi', label: 'UPI', icon: <Smartphone className="w-5 h-5" /> },
  ];

  if (orderConfirmed) {
    return (
      <div className="py-20 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8">Thank you! Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/cart" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <input
              type="text"
              placeholder="Street Address"
              value={formData.shippingAddress.street}
              onChange={e => setFormData({
                ...formData,
                shippingAddress: { ...formData.shippingAddress, street: e.target.value }
              })}
              className="w-full p-3 border rounded-lg"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={formData.shippingAddress.city}
                onChange={e => setFormData({
                  ...formData,
                  shippingAddress: { ...formData.shippingAddress, city: e.target.value }
                })}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="State"
                value={formData.shippingAddress.state}
                onChange={e => setFormData({
                  ...formData,
                  shippingAddress: { ...formData.shippingAddress, state: e.target.value }
                })}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="ZIP Code"
                value={formData.shippingAddress.zip}
                onChange={e => setFormData({
                  ...formData,
                  shippingAddress: { ...formData.shippingAddress, zip: e.target.value }
                })}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Country"
                value={formData.shippingAddress.country}
                onChange={e => setFormData({
                  ...formData,
                  shippingAddress: { ...formData.shippingAddress, country: e.target.value }
                })}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
          </div>

          {/* Payment */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold">Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentOptions.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: opt.id })}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition ${
                    formData.paymentMethod === opt.id
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {opt.icon}
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Card Details */}
            {formData.paymentMethod === 'card' && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardDetails.number}
                    onChange={e => setFormData({
                      ...formData,
                      cardDetails: { ...formData.cardDetails, number: e.target.value }
                    })}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.cardDetails.expiry}
                      onChange={e => setFormData({
                        ...formData,
                        cardDetails: { ...formData.cardDetails, expiry: e.target.value }
                      })}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={formData.cardDetails.cvv}
                      onChange={e => setFormData({
                        ...formData,
                        cardDetails: { ...formData.cardDetails, cvv: e.target.value }
                      })}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                </div>
                {errors.card && <p className="text-red-500 text-sm">{errors.card}</p>}
              </div>
            )}

            {/* UPI Info (Read-only) */}
            {formData.paymentMethod === 'upi' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">
                  Pay to: <span className="font-bold">{RECEIVER_UPI_ID}</span>
                </p>
                <p className="text-xs text-green-600 mt-1">Amount: ₹{total.toFixed(2)}</p>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">Subtotal: ₹{cartTotalPrice.toFixed(2)}</div>
                <div className="flex justify-between">Shipping: ₹{shippingCost.toFixed(2)}</div>
                <div className="flex justify-between">Tax: ₹{tax.toFixed(2)}</div>
              </div>
              <div className="border-t pt-2 font-bold text-lg flex justify-between">
                Total: ₹{total.toFixed(2)}
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || !formData.paymentMethod}
              className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                isProcessing || !formData.paymentMethod
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-blue-700'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : formData.paymentMethod === 'upi' ? (
                'Pay with UPI'
              ) : (
                'Place Order'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}