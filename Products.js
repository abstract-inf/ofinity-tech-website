document.addEventListener('DOMContentLoaded', function() {
    console.log('Products page loaded');
    
    // Disable click events for unavailable products
    document.querySelectorAll('[data-available="false"] .order-btn').forEach(button => {
        button.onclick = function(e) {
            if (this.closest('[data-available="false"]')) {
                e.preventDefault();
                return false;
            }
        };
    });
});