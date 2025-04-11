document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling for Navbar Links ---
    const navLinks = document.querySelectorAll('.navbar nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Check if it's an internal link
            if (href && href.startsWith('#')) {
                e.preventDefault(); // Prevent default jump
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Calculate offset if navbar is sticky
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Optional: Close mobile menu if open (add logic if you implement one)
                }
            }
        });
    });

    // --- Update Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Add 'active' class to nav link on scroll ---
    // This is slightly more complex, involves tracking scroll position
    // and comparing it to section offsets. Can be added later if desired.

});