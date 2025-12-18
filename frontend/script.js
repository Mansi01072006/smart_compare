// Global variables
let currentResults = [];
const API_BASE = 'http://localhost:3000';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadTrendingProducts();
    setupSearchListeners();
    setupScrollAnimations();
});

// Setup search functionality
function setupSearchListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProduct();
        }
    });
    
    searchInput.addEventListener('input', function() {
        showSearchSuggestions(this.value);
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            hideSuggestions();
        }
    });
}

// Search suggestions
function showSearchSuggestions(query) {
    const suggestions = document.getElementById('suggestions');
    
    if (query.length < 2) {
        hideSuggestions();
        return;
    }
    
    const commonSearches = [
        'iPhone 15 Pro', 'Samsung Galaxy S24', 'MacBook Pro', 'Nike Air Max',
        'Sony Headphones', 'Dell XPS', 'Adidas Stan Smith', 'Converse Chuck Taylor',
        'Puma RS-X', 'Reebok Classic', 'Dyson V15', 'Instant Pot', 'Philips Sonicare',
        'Whisper', 'Stayfree', 'Sofy', 'sanitary pads', 'shampoo', 'conditioner',
        'shoes', 'laptops', 'headphones', 'smartphones', 'kitchen appliances'
    ];
    
    const filtered = commonSearches.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    
    if (filtered.length > 0) {
        suggestions.innerHTML = filtered.map(item => 
            `<div class="suggestion-item" onclick="selectSuggestion('${item}')">${item}</div>`
        ).join('');
        suggestions.style.display = 'block';
    } else {
        hideSuggestions();
    }
}

function selectSuggestion(suggestion) {
    document.getElementById('searchInput').value = suggestion;
    hideSuggestions();
    searchProduct();
}

function hideSuggestions() {
    document.getElementById('suggestions').style.display = 'none';
}

// Main search function
function searchProduct() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) {
        showNotification('Please enter a product name', 'warning');
        return;
    }
    
    showLoading();
    hideSuggestions();
    
    fetch(`${API_BASE}/search/${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            hideLoading();
            
            if (data.message === 'Product not found') {
                showNoResults(data);
            } else if (data.results && data.results.length > 0) {
                currentResults = data.results;
                displayResults(data.results);
                scrollToResults();
            } else {
                showNoResults();
            }
        })
        .catch(error => {
            hideLoading();
            console.error('Search error:', error);
            showNotification('Search failed. Please try again.', 'error');
        });
}

// Display search results
function displayResults(results) {
    const resultsSection = document.getElementById('results');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsCount = document.getElementById('resultsCount');
    
    resultsTitle.textContent = `Search Results for "${document.getElementById('searchInput').value}"`;
    resultsCount.textContent = `${results.length} product${results.length > 1 ? 's' : ''} found`;
    
    resultsContainer.innerHTML = results.map(result => createProductCard(result)).join('');
    
    resultsSection.style.display = 'block';
    
    // Add animation
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 100);
        });
    }, 100);
}

// Create product card HTML
function createProductCard(result) {
    const { product, listings, analysis } = result;
    
    return `
        <div class="product-card">
            <div class="product-header">
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/150x150?text=No+Image'">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-brand">${product.brand} • ${product.category}</div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-specs">
                        ${Object.entries(product.specifications || {}).map(([key, value]) => 
                            `<span class="spec-item">${key}: ${value}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
            
            ${createAnalysisSection(analysis)}
            
            <div class="listings-section">
                <h4 style="margin: 1.5rem 2rem 1rem; color: #333; font-size: 1.3rem;">
                    <i class="fas fa-store" style="margin-right: 10px; color: #667eea;"></i>
                    Available on ${analysis.totalPlatforms} platforms
                </h4>
                <div class="listings-grid" style="padding: 0 2rem 2rem;">
                    ${listings.map(listing => createListingCard(listing)).join('')}
                </div>
            </div>
        </div>
    `;
}

// Create analysis section
function createAnalysisSection(analysis) {
    return `
        <div class="analysis-section">
            <h3 class="analysis-title">
                <i class="fas fa-chart-line"></i>
                Smart Analysis
            </h3>
            
            ${analysis.savings.amount > 0 ? `
                <div class="savings-info">
                    <div class="savings-amount">Save ₹${analysis.savings.amount}</div>
                    <div>Up to ${analysis.savings.percentage}% off compared to highest price</div>
                </div>
            ` : ''}
            
            <div class="analysis-grid">
                <div class="analysis-card best-value">
                    <h4><i class="fas fa-trophy"></i> Best Value</h4>
                    <div class="analysis-price">₹${analysis.bestValue.price}</div>
                    <div class="analysis-platform">${analysis.bestValue.platformLogo} ${analysis.bestValue.platform}</div>
                    <div class="analysis-details">Quality Score: ${analysis.bestValue.qualityScore}/10</div>
                </div>
                
                <div class="analysis-card cheapest">
                    <h4><i class="fas fa-tag"></i> Cheapest</h4>
                    <div class="analysis-price">₹${analysis.cheapest.price}</div>
                    <div class="analysis-platform">${analysis.cheapest.platformLogo} ${analysis.cheapest.platform}</div>
                    <div class="analysis-details">${analysis.cheapest.discount}% discount</div>
                </div>
                
                <div class="analysis-card best-rated">
                    <h4><i class="fas fa-star"></i> Best Rated</h4>
                    <div class="analysis-price">₹${analysis.bestRated.price}</div>
                    <div class="analysis-platform">${analysis.bestRated.platformLogo} ${analysis.bestRated.platform}</div>
                    <div class="analysis-details">${analysis.bestRated.rating}★ (${analysis.bestRated.reviews} reviews)</div>
                </div>
                
                <div class="analysis-card fastest">
                    <h4><i class="fas fa-shipping-fast"></i> Fastest Delivery</h4>
                    <div class="analysis-price">₹${analysis.fastestDelivery.price}</div>
                    <div class="analysis-platform">${analysis.fastestDelivery.platformLogo} ${analysis.fastestDelivery.platform}</div>
                    <div class="analysis-details">${analysis.fastestDelivery.deliveryDays} day${analysis.fastestDelivery.deliveryDays > 1 ? 's' : ''}</div>
                </div>
            </div>
        </div>
    `;
}

// Create listing card
function createListingCard(listing) {
    const stars = '★'.repeat(Math.floor(listing.rating)) + '☆'.repeat(5 - Math.floor(listing.rating));
    
    return `
        <div class="listing-card">
            <div class="listing-header">
                <div class="platform-name">
                    <span>${listing.platformLogo}</span>
                    ${listing.platform}
                </div>
                ${listing.discount > 0 ? `<div class="discount-badge">${listing.discount}% OFF</div>` : ''}
            </div>
            
            <div class="listing-price">
                ₹${listing.price}
                ${listing.originalPrice > listing.price ? `<span class="original-price">₹${listing.originalPrice}</span>` : ''}
            </div>
            
            <div class="rating">
                <span class="stars">${stars}</span>
                <span>${listing.rating} (${listing.reviews})</span>
            </div>
            
            <div class="quality-score">
                Quality Score: ${listing.qualityScore}/10
            </div>
            
            <div class="listing-details">
                <div><strong>Delivery:</strong> ${listing.deliveryDays} days</div>
                <div><strong>Seller:</strong> ${listing.seller}</div>
                <div><strong>Warranty:</strong> ${listing.warranty}</div>
                <div><strong>Return:</strong> ${listing.returnPolicy}</div>
            </div>
            
            <button class="cta-button" onclick="window.open('${listing.url}', '_blank')">
                <i class="fas fa-external-link-alt"></i> View on ${listing.platform}
            </button>
        </div>
    `;
}

// Load trending products
function loadTrendingProducts() {
    fetch(`${API_BASE}/search/`)
        .then(response => response.json())
        .then(data => {
            if (data.trending) {
                displayTrendingProducts(data.trending);
            }
        })
        .catch(error => {
            console.error('Error loading trending products:', error);
        });
}

// Display trending products
function displayTrendingProducts(products) {
    const trendingGrid = document.getElementById('trendingGrid');
    
    trendingGrid.innerHTML = products.map(product => `
        <div class="trending-card" onclick="searchForProduct('${product.name}')">
            <img src="${product.image}" alt="${product.name}" class="trending-image" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            <div class="trending-content">
                <h4 class="trending-title">${product.name}</h4>
                <div class="trending-price">Starting from ₹999</div>
                <div style="color: #666; font-size: 0.9rem; margin-top: 0.5rem;">
                    ${product.brand} • ${product.category}
                </div>
            </div>
        </div>
    `).join('');
}

// Search for a specific product
function searchForProduct(productName) {
    document.getElementById('searchInput').value = productName;
    searchProduct();
}

// Show loading state
function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';
}

// Hide loading state
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Show no results
function showNoResults(data = {}) {
    const { suggestions = [], didYouMean = null } = data;
    const resultsSection = document.getElementById('results');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsCount = document.getElementById('resultsCount');
    
    resultsTitle.textContent = 'No Products Found';
    resultsCount.textContent = '';
    
    resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem; color: #666;">
            <i class="fas fa-search" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.3;"></i>
            <h3 style="margin-bottom: 1rem;">No products found</h3>
            
            ${didYouMean && didYouMean.length > 0 ? `
                <div style="margin-bottom: 2rem; padding: 1rem; background: #f8f9ff; border-radius: 10px; display: inline-block;">
                    <p style="margin-bottom: 1rem; color: #333;">Did you mean:</p>
                    <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
                        ${didYouMean.map(term => 
                            `<button onclick="searchForProduct('${term}')" 
                                    style="background: #4CAF50; color: white; border: none; padding: 0.5rem 1rem; 
                                           border-radius: 15px; cursor: pointer; font-weight: bold;"
                                    onmouseover="this.style.background='#45a049'"
                                    onmouseout="this.style.background='#4CAF50'">
                                ${term}
                            </button>`
                        ).join('')}
                    </div>
                </div>
            ` : ''}
            
            <p style="margin-bottom: 2rem;">Try searching for something else or check out our suggestions below:</p>
            
            ${suggestions.length > 0 ? `
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    ${suggestions.map(suggestion => 
                        `<button onclick="searchForProduct('${suggestion}')" 
                                style="background: #667eea; color: white; border: none; padding: 0.5rem 1rem; 
                                       border-radius: 20px; cursor: pointer; transition: transform 0.3s ease;"
                                onmouseover="this.style.transform='translateY(-2px)'"
                                onmouseout="this.style.transform='translateY(0)'">
                            ${suggestion}
                        </button>`
                    ).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    resultsSection.style.display = 'block';
    scrollToResults();
}

// Scroll to results
function scrollToResults() {
    setTimeout(() => {
        document.getElementById('results').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#4CAF50'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature, .trending-card').forEach(el => {
        observer.observe(el);
    });
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
