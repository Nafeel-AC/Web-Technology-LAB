/**
 * Script to update all HTML pages with sticky navbar and animations
 * This script will:
 * 1. Add the CSS and JS references to all pages
 * 2. Update the navbar to be sticky
 * 3. Add animation classes to sections
 */

const fs = require('fs');
const path = require('path');

// Pages to update
const pages = [
    'Pages/Community.html',
    'Pages/Products.html',
    'Pages/features.html',
    'Pages/pricing.html'
];

// Root directory
const rootDir = __dirname;

// Function to update a page
function updatePage(pagePath) {
    const fullPath = path.join(rootDir, pagePath);
    
    // Read the file
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Add CSS reference if not already present
    if (!content.includes('animations.css')) {
        content = content.replace(
            /<link[^>]*bootstrap[^>]*>/,
            '$&\n    <link rel="stylesheet" href="../css/animations.css">'
        );
    }
    
    // Add JS reference if not already present
    if (!content.includes('main.js')) {
        content = content.replace(
            /<script[^>]*bootstrap[^>]*><\/script>/,
            '$&\n    <script src="../js/main.js"></script>'
        );
    }
    
    // Add page transition overlay
    if (!content.includes('page-transition')) {
        content = content.replace(
            /<body[^>]*>/,
            '$&\n    <!-- Page transition overlay -->\n    <div class="page-transition"></div>'
        );
    }
    
    // Update navbar to be sticky and add animation classes
    content = content.replace(
        /<nav class="navbar[^>]*>/,
        '<nav class="navbar navbar-expand-lg sticky-top">'
    );
    
    // Update navbar toggler to have animation class
    content = content.replace(
        /<button class="navbar-toggler[^>]*>/,
        '<button class="navbar-toggler navbar-toggler-animation" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">'
    );
    
    // Add animation classes to sections
    const animations = ['fade-in', 'slide-up', 'slide-right', 'slide-left', 'zoom-in'];
    let animationIndex = 0;
    
    content = content.replace(
        /<section[^>]*>/g,
        (match) => {
            const animation = animations[animationIndex % animations.length];
            animationIndex++;
            return match.replace('>', ` class="animate-on-scroll" data-animation="${animation}">`);
        }
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${pagePath}`);
}

// Update each page
pages.forEach(updatePage);

console.log('All pages updated successfully!');
