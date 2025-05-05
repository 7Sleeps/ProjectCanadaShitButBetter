document.addEventListener('DOMContentLoaded', function() {

    // --- Feather Icons ---
    // Initialize Feather Icons
    feather.replace();

    // --- Mobile Menu ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeButton = document.getElementById('mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link'); // Get all mobile nav links

    if (menuToggle && mobileMenu && closeButton) {
        // Function to open the menu
        const openMenu = () => {
            mobileMenu.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        };

        // Function to close the menu
        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Restore background scroll
        };

        // Event listener for the toggle button
        menuToggle.addEventListener('click', openMenu);

        // Event listener for the close button
        closeButton.addEventListener('click', closeMenu);

        // Event listeners for each nav link to close menu on click
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Optional: Close menu if clicking outside of it
        // document.addEventListener('click', function(event) {
        //     if (mobileMenu.classList.contains('active') &&
        //         !mobileMenu.contains(event.target) &&
        //         !menuToggle.contains(event.target)) {
        //         closeMenu();
        //     }
        // });

        // Optional: Close menu on ESC key press
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // --- Active Nav Link Highlighting (Optional) ---
    // You might need a more sophisticated approach for single-page apps,
    // but here's a basic intersection observer example for scrolling.
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a.nav-link'); // Desktop links

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '-40% 0px -60% 0px', // Trigger when section is roughly centered
        threshold: 0 // Trigger as soon as section enters/leaves margin
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

}); // End DOMContentLoaded
