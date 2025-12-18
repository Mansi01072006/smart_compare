# SmartCompare - Price Comparison Web Application

A full-stack web application that allows users to search for products and instantly get price comparisons, quality analysis, ratings, reviews, and best value suggestions from multiple e-commerce platforms.

## Features

- **Multi-Platform Price Comparison** - Compare prices across Amazon, Flipkart, Myntra, Croma, and brand stores
- **Smart Analysis** - Get best value, cheapest, highest rated, and fastest delivery options
- **Quality Scoring** - AI-powered quality scores based on reviews and ratings
- **Spell Checking** - "Did you mean?" suggestions for typos
- **Category Search** - Search by product categories (shoes, laptops, smartphones, etc.)
- **Savings Calculator** - See how much you can save across platforms
- **Modern UI** - Clean, responsive design with animations

## Product Categories

### Electronics
- Smartphones (iPhone, Samsung Galaxy)
- Laptops (MacBook Pro, Dell XPS)
- Headphones (Sony WH-1000XM5)

### Fashion & Footwear
- Nike Air Force 1, Air Max 270
- Adidas Stan Smith
- Puma RS-X
- Converse Chuck Taylor
- Reebok Classic

### Daily Essentials
- Hair Care (L'Oreal Shampoo, TRESemme Conditioner, Pantene Oil)
- Personal Care (Philips Sonicare, Colgate Toothpaste)
- Body Care (Dove Body Wash)
- Feminine Hygiene (Whisper, Stayfree, Sofy)
- Wooden Combs (Neem, Bamboo, Sandalwood)

### Home & Kitchen
- Instant Pot Duo 7-in-1
- Dyson V15 Detect Vacuum
- Keurig Coffee Maker
- Johnson's Baby Powder

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **RESTful API** design
- **Spell checking** with Levenshtein distance algorithm

### Frontend
- **Vanilla JavaScript** (ES6+)
- **CSS3** with modern animations
- **Responsive Design**
- **Font Awesome** icons

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB connection string
- Python 3 (for frontend server)

### Backend Setup
```bash
cd backend
npm install
node seedData.js  # Populate database
node server.js    # Start on port 3000
```

### Frontend Setup
```bash
cd frontend
python3 -m http.server 8000  # Start on port 8000
```

## API Endpoints

- `GET /search/:name` - Search products by name/category
- `GET /search/` - Get trending products

## Database Schema

### Product Model
```javascript
{
  productId: String,
  name: String,
  brand: String,
  category: String,
  description: String,
  image: String,
  specifications: Object,
  averageRating: Number,
  totalReviews: Number
}
```

### Listing Model
```javascript
{
  productId: String,
  platform: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  rating: Number,
  reviews: Number,
  deliveryDays: Number,
  qualityScore: Number,
  valueScore: Number
}
```

## Usage Examples

### Search Queries
- `"iPhone"` - Shows iPhone models with price comparison
- `"shoes"` - Shows all shoe brands (Nike, Adidas, Puma, etc.)
- `"shampoo"` - Shows hair care products
- `"sanitary pads"` - Shows feminine hygiene products

### Spell Checking
- `"ipone"` → Suggests "iphone"
- `"samsng"` → Suggests "samsung"
- `"nkie"` → Suggests "nike"

## Key Features Implementation

### Smart Value Calculation
```javascript
valueScore = (qualityScore * 0.6 + normalizedPrice * 0.4) * 10
```

### Category Mapping
- Intelligent search that maps "phones" → "smartphone"
- "sneakers" → "shoes", "laptops" → "laptop"

### Savings Analysis
- Calculates price differences across platforms
- Shows percentage savings and absolute amounts

## Contributing

1. Add new products in `backend/addProducts.js`
2. Update category mappings in `routes/search.js`
3. Add spell check terms in `findSpellingSuggestions()`

## License

MIT License - Feel free to use for personal and commercial projects.