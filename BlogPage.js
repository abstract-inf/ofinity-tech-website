document.addEventListener('DOMContentLoaded', function() {
    // Add animation to blog cards on scroll
    const blogPosts = document.querySelectorAll('.blog-post');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1
    });
    
    blogPosts.forEach((post, index) => {
        post.style.opacity = "0";
        post.style.transform = "translateY(30px)";
        post.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        post.style.transitionDelay = `${index * 0.2}s`;
        
        observer.observe(post);
    });
    
    // Add active state to navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('current-page'));
            this.classList.add('current-page');
        });
    });
});