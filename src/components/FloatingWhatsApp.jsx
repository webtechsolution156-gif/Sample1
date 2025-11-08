import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const phone = "+15551234567";
  const message = "Hello! I'm interested in your products.";

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-110 z-40"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}