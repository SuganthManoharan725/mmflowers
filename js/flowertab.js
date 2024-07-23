
    function showCategory(category) {
    // Hide all product categories
    document.querySelectorAll('.product-category').forEach(function(element) {
        element.style.display = 'none';
    });
    // Show the selected product category
    document.getElementById(category).style.display = 'flex';
}
