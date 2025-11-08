
// src/assets/assets.js

// Import category images
import pulsesImg from '../assets/pulses.jpg';
import vegetablesImg from '../assets/vegetables.jpeg';
import spicesImg from '../assets/spices.jpg';
import grainsImg from '../assets/grains.jpeg';
import essentialsImg from '../assets/essentials.jpeg';
import nutsImg from '../assets/nuts.jpeg';

// Import individual product images
import wheatImg from '../assets/wheat.jpeg';
import riceImg from '../assets/rice.jpeg';
import makhanaImg from '../assets/makhana.jpeg';
import moongDalImg from '../assets/moongdal.jpeg';
import toorDalImg from '../assets/toordal.jpeg';
import soybeansImg from '../assets/soyabeans.jpeg';
import turmericImg from '../assets/turmaric.jpeg';
import pepperImg from '../assets/papper.jpeg';
import mustardImg from '../assets/mustard.jpeg';
import onionImg from '../assets/onion.jpeg';
import potatoImg from '../assets/potato.jpeg';
import garlicImg from '../assets/garlic.jpeg';
import dryCoconutImg from '../assets/drycoconut.jpeg';
import greenCoconutImg from '../assets/greencoconut.jpeg';
import sugarImg from '../assets/sugar.jpeg';
import gheeImg from '../assets/ghee.jpeg';
import teaImg from '../assets/tea.jpeg';

// CATEGORIES - Updated to match URL slugs and use proper images
export const categories = [
  { 
    name: 'Pulses & Legumes', 
    slug: 'pulses-legumes',
    image: pulsesImg, 
    description: 'Premium lentils, beans, and protein-rich pulses from trusted Indian farmers.',
    path: '/products/pulses-legumes'
  },
  { 
    name: 'Vegetables', 
    slug: 'vegetables',
    image: vegetablesImg, 
    description: 'Fresh, high-quality vegetables perfect for export and culinary excellence.',
    path: '/products/vegetables'
  },
  { 
    name: 'Spices', 
    slug: 'spices',
    image: spicesImg, 
    description: 'Authentic Indian spices with rich aroma and traditional processing methods.',
    path: '/products/spices'
  },
  { 
    name: 'Grains & Cereals', 
    slug: 'grains-cereals',
    image: grainsImg, 
    description: 'Staple grains including rice, wheat, and other cereals for global markets.',
    path: '/products/grains-cereals'
  },
  { 
    name: 'Nuts, Fruits & Oilseeds', 
    slug: 'nuts-fruits-oilseeds',
    image: nutsImg, 
    description: 'Premium nuts, dried fruits, and oilseeds sourced sustainably.',
    path: '/products/nuts-fruits-oilseeds'
  },
  { 
    name: 'Daily Essentials', 
    slug: 'daily-essentials',
    image: essentialsImg, 
    description: 'Everyday essentials including sweeteners, ghee, and traditional ingredients.',
    path: '/products/daily-essentials'
  },
];

// PRODUCTS - Updated with additional production information
export const products = {
  "pulses-legumes": [
    { 
      id: 'p1', 
      name: 'Fox Nuts (Makhana)', 
      description: 'Protein-rich, light, and healthy lotus seeds roasted to perfection.', 
      price: 700, 
      image: makhanaImg,
      unit: 'kg',
      origin: 'Bihar, India',
      features: ['Gluten-free', 'High protein', 'Low calorie'],
      productionMethod: 'Hand-harvested from lotus ponds, sun-dried, and roasted using traditional methods.',
      certifications: ['Organic Certified', 'FSSAI Approved']
    },
    { 
      id: 'p2', 
      name: 'Moong Dal', 
      description: 'Split and skinned Moong lentils, easy to digest and quick to cook.', 
      price: 130, 
      image: moongDalImg,
      unit: 'kg',
      origin: 'Rajasthan, India',
      features: ['High protein', 'Easy digestion', 'Versatile cooking'],
      productionMethod: 'Cultivated in arid regions, mechanically split and polished for quality.',
      certifications: ['FSSAI Approved', 'Non-GMO']
    },
    { 
      id: 'p3', 
      name: 'Toor Dal', 
      description: 'Yellow pigeon pea lentils, high in protein and a traditional favorite.', 
      price: 115, 
      image: toorDalImg,
      unit: 'kg',
      origin: 'Maharashtra, India',
      features: ['Rich in protein', 'Traditional dal', 'Long shelf life'],
      productionMethod: 'Grown in rain-fed fields, dehusked and split using modern milling techniques.',
      certifications: ['FSSAI Approved', 'ISO 22000']
    },
    { 
      id: 'p4', 
      name: 'Soybeans', 
      description: 'High-yield, nutrient-dense soybeans for food and industrial applications.', 
      price: 75, 
      image: soybeansImg,
      unit: 'kg',
      origin: 'Madhya Pradesh, India',
      features: ['High protein', 'Versatile uses', 'Sustainable crop'],
      productionMethod: 'Cultivated using sustainable farming, mechanically harvested and cleaned.',
      certifications: ['Non-GMO', 'FSSAI Approved']
    },
  ],
  "spices": [
    { 
      id: 's1', 
      name: 'Turmeric Fingers', 
      description: 'Whole turmeric fingers with high curcumin content for health benefits.', 
      price: 200, 
      image: turmericImg,
      unit: 'kg',
      origin: 'Erode, Tamil Nadu',
      features: ['High curcumin', 'Anti-inflammatory', 'Organic certified'],
      productionMethod: 'Grown in fertile soils, hand-harvested, and sun-dried to retain curcumin.',
      certifications: ['USDA Organic', 'FSSAI Approved']
    },
    { 
      id: 's2', 
      name: 'Black Pepper', 
      description: 'Bold, whole black pepper corns with pungent aroma and flavor.', 
      price: 450, 
      image: pepperImg,
      unit: 'kg',
      origin: 'Kerala, India',
      features: ['High piperine', 'Antioxidant rich', 'Premium quality'],
      productionMethod: 'Hand-picked from vines, sun-dried, and sorted for quality.',
      certifications: ['FSSAI Approved', 'Spice Board Certified']
    },
    { 
      id: 's3', 
      name: 'Mustard Seeds', 
      description: 'Small, aromatic mustard seeds perfect for tempering and pickling.', 
      price: 110, 
      image: mustardImg,
      unit: 'kg',
      origin: 'Rajasthan, India',
      features: ['Rich flavor', 'Healthy fats', 'Versatile spice'],
      productionMethod: 'Grown in semi-arid regions, mechanically harvested and cleaned.',
      certifications: ['FSSAI Approved', 'Non-GMO']
    },
  ],
  "vegetables": [
    { 
      id: 'v1', 
      name: 'Red Onions', 
      description: 'Fresh, large Indian red onions essential for cooking worldwide.', 
      price: 30, 
      image: onionImg,
      unit: 'kg',
      origin: 'Maharashtra, India',
      features: ['Long shelf life', 'Rich flavor', 'Export quality'],
      productionMethod: 'Grown in well-drained soils, hand-harvested, and cured for storage.',
      certifications: ['FSSAI Approved', 'GAP Certified']
    },
    { 
      id: 'v2', 
      name: 'Potatoes', 
      description: 'High-quality, starchy potatoes suitable for all cuisines and processing.', 
      price: 25, 
      image: potatoImg,
      unit: 'kg',
      origin: 'Uttar Pradesh, India',
      features: ['Uniform size', 'Long storage', 'Versatile use'],
      productionMethod: 'Cultivated in sandy loam soils, mechanically harvested and sorted.',
      certifications: ['FSSAI Approved', 'Non-GMO']
    },
    { 
      id: 'v3', 
      name: 'Garlic Cloves', 
      description: 'Pungent and healthy Indian garlic cloves for culinary and medicinal use.', 
      price: 150, 
      image: garlicImg,
      unit: 'kg',
      origin: 'Madhya Pradesh, India',
      features: ['High allicin', 'Antibacterial', 'Fresh harvest'],
      productionMethod: 'Grown in organic-rich soils, hand-harvested, and air-dried.',
      certifications: ['Organic Certified', 'FSSAI Approved']
    },
  ],
  "grains-cereals": [
    { 
      id: 'g1', 
      name: 'Durum Wheat', 
      description: 'Premium Indian durum wheat, ideal for pasta and traditional breads.', 
      price: 40, 
      image: wheatImg,
      unit: 'kg',
      origin: 'Punjab, India',
      features: ['High gluten', 'Golden color', 'Export grade'],
      productionMethod: 'Grown in fertile plains, mechanically harvested, and cleaned.',
      certifications: ['FSSAI Approved', 'Non-GMO']
    },
    { 
      id: 'g2', 
      name: 'Basmati Rice', 
      description: 'Aromatic, extra-long grain Basmati rice, the king of Indian rice varieties.', 
      price: 120, 
      image: riceImg,
      unit: 'kg',
      origin: 'Uttar Pradesh, India',
      features: ['Extra long grain', 'Aromatic', 'GI tagged'],
      productionMethod: 'Cultivated in Himalayan foothills, hand-harvested, and aged for flavor.',
      certifications: ['GI Tagged', 'FSSAI Approved']
    },
  ],
  "nuts-fruits-oilseeds": [
    { 
      id: 'n1', 
      name: 'Dry Coconut', 
      description: 'Premium dried coconuts or copra for culinary and industrial use.', 
      price: 180, 
      image: dryCoconutImg,
      unit: 'piece',
      origin: 'Kerala, India',
      features: ['High oil content', 'Long shelf life', 'Versatile use'],
      productionMethod: 'Harvested from coastal plantations, sun-dried, and processed for oil extraction.',
      certifications: ['FSSAI Approved', 'Organic Certified']
    },
    { 
      id: 'n2', 
      name: 'Green Coconuts', 
      description: 'Tender green coconuts rich in natural electrolytes and sweet water.', 
      price: 50, 
      image: greenCoconutImg,
      unit: 'piece',
      origin: 'Tamil Nadu, India',
      features: ['Rich in electrolytes', 'Natural hydration', 'Fresh quality'],
      productionMethod: 'Hand-picked from young coconut trees, minimally processed for freshness.',
      certifications: ['FSSAI Approved', 'GAP Certified']
    },
  ],
  "daily-essentials": [
    { 
      id: 'd1', 
      name: 'Granulated Sugar', 
      description: 'Finely granulated white sugar from trusted Indian mills.', 
      price: 45, 
      image: sugarImg,
      unit: 'kg',
      origin: 'Uttar Pradesh, India',
      features: ['Pure quality', 'Fine granules', 'Food grade'],
      productionMethod: 'Extracted from sugarcane, refined, and granulated in modern mills.',
      certifications: ['FSSAI Approved', 'ISO 22000']
    },
    { 
      id: 'd2', 
      name: 'Pure Ghee', 
      description: 'Traditional clarified butter made from cow milk using ancient methods.', 
      price: 850, 
      image: gheeImg,
      unit: 'kg',
      origin: 'Uttar Pradesh, India',
      features: ['Pure cow ghee', 'Traditional method', 'Rich aroma'],
      productionMethod: 'Made from cultured cow milk butter, slowly clarified over low heat.',
      certifications: ['FSSAI Approved', 'Organic Certified']
    },
    { 
      id: 'd3', 
      name: 'Assam Tea', 
      description: 'Strong, aromatic black tea leaves from Assam tea gardens.', 
      price: 350, 
      image: teaImg,
      unit: 'kg',
      origin: 'Assam, India',
      features: ['Malty flavor', 'Strong brew', 'Premium leaves'],
      productionMethod: 'Hand-plucked from tea estates, withered, rolled, and oxidized.',
      certifications: ['FSSAI Approved', 'Rainforest Alliance']
    },
  ],
};

// Helper function to get category by slug
export const getCategoryBySlug = (slug) => {
  return categories.find(cat => cat.slug === slug);
};

// Helper function to get all products with category info
export const getAllProductsWithCategories = () => {
  return Object.keys(products).map(slug => {
    const category = getCategoryBySlug(slug);
    return {
      ...category,
      productList: products[slug]
    };
  }).filter(item => item.productList && item.productList.length > 0);
};