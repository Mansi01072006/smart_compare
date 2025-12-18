const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Listing = require("../models/Listing");

// Calculate value score based on price and quality
function calculateValueScore(listing) {
  const qualityWeight = 0.6;
  const priceWeight = 0.4;
  const maxPrice = 5000; // Normalize price
  
  const normalizedPrice = Math.max(0, (maxPrice - listing.price) / maxPrice);
  const normalizedQuality = listing.qualityScore / 10;
  
  return (normalizedQuality * qualityWeight + normalizedPrice * priceWeight) * 10;
}

// Simple spell checker
function levenshteinDistance(str1, str2) {
  const matrix = [];
  for (let i = 0; i <= str2.length; i++) matrix[i] = [i];
  for (let j = 0; j <= str1.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
  }
  return matrix[str2.length][str1.length];
}

function findSpellingSuggestions(searchTerm) {
  const commonTerms = ['iphone', 'samsung', 'macbook', 'nike', 'adidas', 'sony', 'dell', 'apple', 'shoes', 'laptop', 'headphones', 'smartphone', 'shampoo', 'conditioner', 'toothpaste', 'comb', 'dyson', 'instant pot', 'converse', 'puma', 'reebok', 'whisper', 'stayfree', 'sofy', 'pads', 'sanitary'];
  const suggestions = [];
  const searchLower = searchTerm.toLowerCase();
  
  for (const term of commonTerms) {
    const distance = levenshteinDistance(searchLower, term);
    if (distance <= 2 && distance > 0) suggestions.push({ term, distance });
  }
  
  return suggestions.sort((a, b) => a.distance - b.distance).slice(0, 3).map(s => s.term);
}

router.get("/:name", async (req, res) => {
  try {
    const searchTerm = req.params.name.toLowerCase();
    
    // Enhanced search with category mapping
    const categoryMap = {
      'phone': 'smartphone',
      'mobile': 'smartphone', 
      'laptop': 'laptop',
      'computer': 'laptop',
      'shoes': 'shoes',
      'sneakers': 'shoes',
      'headphones': 'headphones',
      'earphones': 'headphones',
      'kitchen': 'kitchen appliances',
      'home': 'home appliances',
      'vacuum': 'home appliances',
      'toothbrush': 'personal care',
      'coffee': 'kitchen appliances',
      'comb': 'personal care',
      'hair': 'hair care',
      'shampoo': 'hair care',
      'conditioner': 'hair care',
      'body wash': 'body care',
      'toothpaste': 'oral care',
      'baby': 'baby care',
      'pads': 'feminine hygiene',
      'sanitary': 'feminine hygiene'
    };
    
    let searchCategory = searchTerm;
    for (const [key, value] of Object.entries(categoryMap)) {
      if (searchTerm.includes(key)) {
        searchCategory = value;
        break;
      }
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: req.params.name, $options: "i" } },
        { brand: { $regex: req.params.name, $options: "i" } },
        { category: { $regex: searchCategory, $options: "i" } },
        { description: { $regex: req.params.name, $options: "i" } }
      ]
    });

    if (products.length === 0) {
      const spellingSuggestions = findSpellingSuggestions(req.params.name);
      return res.json({ 
        message: "Product not found", 
        suggestions: ["iPhone", "Samsung Galaxy", "MacBook", "Nike Shoes", "Sony Headphones", "Adidas", "Converse", "Dyson", "Instant Pot"],
        didYouMean: spellingSuggestions.length > 0 ? spellingSuggestions : null
      });
    }

    const allResults = [];
    
    for (const product of products) {
      const listings = await Listing.find({ productId: product.productId });
      
      if (listings.length > 0) {
        // Calculate value scores
        const listingsWithScores = listings.map(listing => ({
          ...listing.toObject(),
          valueScore: calculateValueScore(listing)
        }));

        const cheapest = listingsWithScores.reduce((a, b) => a.price < b.price ? a : b);
        const bestRated = listingsWithScores.reduce((a, b) => a.rating > b.rating ? a : b);
        const bestValue = listingsWithScores.reduce((a, b) => a.valueScore > b.valueScore ? a : b);
        const fastestDelivery = listingsWithScores.reduce((a, b) => a.deliveryDays < b.deliveryDays ? a : b);

        // Calculate savings
        const maxPrice = Math.max(...listingsWithScores.map(l => l.price));
        const minPrice = Math.min(...listingsWithScores.map(l => l.price));
        const savings = maxPrice - minPrice;
        const savingsPercentage = ((savings / maxPrice) * 100).toFixed(1);

        allResults.push({
          product,
          listings: listingsWithScores,
          analysis: {
            cheapest,
            bestRated,
            bestValue,
            fastestDelivery,
            priceRange: { min: minPrice, max: maxPrice },
            savings: { amount: savings, percentage: savingsPercentage },
            averagePrice: (listingsWithScores.reduce((sum, l) => sum + l.price, 0) / listingsWithScores.length).toFixed(2),
            totalPlatforms: listingsWithScores.length
          }
        });
      }
    }

    // Sort results by relevance and popularity
    allResults.sort((a, b) => {
      // Prioritize exact name matches
      const aNameMatch = a.product.name.toLowerCase().includes(searchTerm) ? 1 : 0;
      const bNameMatch = b.product.name.toLowerCase().includes(searchTerm) ? 1 : 0;
      if (aNameMatch !== bNameMatch) return bNameMatch - aNameMatch;
      
      // Then by total reviews (popularity)
      return b.product.totalReviews - a.product.totalReviews;
    });

    res.json({ 
      results: allResults, 
      count: allResults.length,
      searchTerm: req.params.name,
      category: searchCategory !== searchTerm ? searchCategory : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trending products
router.get("/", async (req, res) => {
  try {
    const trending = await Product.find().limit(6);
    res.json({ trending });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
