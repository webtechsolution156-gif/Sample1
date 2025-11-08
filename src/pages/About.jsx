// src/pages/About.jsx
import { Link } from 'react-router-dom';
import { Truck, Shield, Star, Users, Heart, Zap, ShoppingBag } from 'lucide-react';
import { Target, Eye } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: '10+ years in e-commerce. Passionate about affordable luxury.',
      img: 'bg-gradient-to-br from-blue-400 to-blue-600',
    },
    {
      name: 'Michael Torres',
      role: 'Head of Operations',
      bio: 'Logistics expert ensuring your order arrives fast & safe.',
      img: 'bg-gradient-to-br from-green-400 to-teal-600',
    },
    {
      name: 'Emma Larson',
      role: 'Product Curator',
      bio: 'Hand-picks every item to guarantee quality and style.',
      img: 'bg-gradient-to-br from-pink-400 to-rose-600',
    },
    {
      name: 'David Kim',
      role: 'Customer Happiness',
      bio: 'Here 24/7 to make your shopping experience amazing.',
      img: 'bg-gradient-to-br from-amber-400 to-orange-600',
    },
  ];

  const values = [
    { icon: <Star className="h-8 w-8" />, title: 'Quality First', desc: 'Only premium, tested products make it to our shelves.' },
    { icon: <Truck className="h-8 w-8" />, title: 'Fast Delivery', desc: 'Free shipping on orders over $50. Delivered in 1–3 days.' },
    { icon: <Heart className="h-8 w-8" />, title: 'Customer Love', desc: '24/7 support and 30-day hassle-free returns.' },
    { icon: <Zap className="h-8 w-8" />, title: 'Innovation', desc: 'Always improving with AI curation and smart logistics.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About SampleShop</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We don’t just sell products — we deliver joy, quality, and trust.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-primary mb-4 flex items-center gap-3">
              <Target className="h-8 w-8" />
              Our Mission
            </h2>
            <p className="text-lg text-gray-700">
              To make premium products accessible to everyone through curated selection, transparent pricing, and lightning-fast delivery.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-primary mb-4 flex items-center gap-3">
              <Eye className="h-8 w-8" />
              Our Vision
            </h2>
            <p className="text-lg text-gray-700">
              A world where quality doesn’t come with a premium price tag — and every purchase feels like a smart, joyful decision.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">2025: The Spark</h3>
              <p className="text-gray-600">Founded with a simple idea: quality shouldn’t be expensive.</p>
            </div>
            <div>
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">10K+ Happy Customers</h3>
              <p className="text-gray-600">Grew fast by listening, improving, and delivering.</p>
            </div>
            <div>
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Today & Beyond</h3>
              <p className="text-gray-600">Expanding globally with AI-powered shopping.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
                <div className="text-primary mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="text-center group cursor-pointer"
              >
                <div className={`w-32 h-32 mx-auto rounded-full ${member.img} mb-4 flex items-center justify-center text-white text-4xl font-bold shadow-lg group-hover:scale-105 transition`}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
                <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Shop with Confidence?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands who trust SampleShop for quality, speed, and care.
          </p>
          <Link
            to="/products"
            className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2"
          >
            Start Shopping <ShoppingBag className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

