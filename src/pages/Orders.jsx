// src/pages/Orders.jsx
export default function Orders() {
  const orders = JSON.parse(localStorage.getItem('confirmedOrders') || '[]');
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Confirmed Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.orderId} className="border p-4 rounded">
              <p><strong>Order ID:</strong> {o.orderId}</p>
              <p><strong>Amount:</strong> ₹{o.amount.toFixed(2)}</p>
              <p><strong>Customer:</strong> {o.customer}</p>
              <p><strong>Email:</strong> {o.email}</p>
              <p><strong>Address:</strong> {o.address}</p>
              <p><strong>Date:</strong> {new Date(o.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}