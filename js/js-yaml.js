// Function to fetch and parse YAML data
async function loadConfig() {
    const response = await fetch('config.yaml');
    const yamlText = await response.text();
    return jsyaml.load(yamlText); // Using jsyaml.load for YAML parsing
}

// Global variable to store config data
let CONFIG;

// Function to initialize and use config data
async function initialize() {
    try {
        CONFIG = await loadConfig();
        // Now CONFIG is populated with the YAML data
        // You can use CONFIG.topbar.offer.text and CONFIG.topbar.offer.link to populate your offer bar
        populateOfferBar();
        populateProductSection(); // Assuming you still have a product section to populate
    } catch (error) {
        console.error('Error loading configuration:', error);
    }
}

// Function to populate offer bar with offer text and link
function populateOfferBar() {
    const offerBar = document.getElementById('offerBar');
    if (!offerBar) {
        console.error('Element with id "offerBar" not found.');
        return;
    }

    const offerText = CONFIG.topbar.offer.text;
    const offerLink = CONFIG.topbar.offer.link;

    // Create elements for the offer bar
    const offerTextElement = document.createElement('span');
    offerTextElement.textContent = offerText;

    if (offerLink) {
        const linkElement = document.createElement('a');
        linkElement.href = offerLink;
        linkElement.textContent = "Check it out!";
        offerTextElement.appendChild(linkElement);
    }

    offerBar.appendChild(offerTextElement);
}


// Function to populate product section with categories and items
function populateProductSection() {
    const arrangementsSection = document.getElementById('arrangements');
    const wreathsSection = document.getElementById('wreaths');
    const arrangements = CONFIG.products.categories.arrangements;
    const wreaths = CONFIG.products.categories.wreaths;

    // Example: Populate arrangements
    arrangements.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'col-sm-4';
        div.innerHTML = `
            <div class="innerproductsection">
                <img src="${item.image}" alt="Product Image" />
                
            </div>
        `;
        arrangementsSection.appendChild(div);
    });

    // Example: Populate wreaths (similar approach)
    wreaths.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'col-sm-4';
        div.innerHTML = `
            <div class="innerproductsection">
                <img src="${item.image}" alt="Product Image" />
               
            </div>
        `;
        wreathsSection.appendChild(div);
    });
}

// Initialize on page load
window.onload = initialize;
