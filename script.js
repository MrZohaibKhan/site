document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling for Navbar Links ---
    const navLinks = document.querySelectorAll('.navbar nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Check if it's an internal page link
            if (href && href.startsWith('#')) {
                e.preventDefault(); // Prevent default jump
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Calculate offset to account for sticky navbar height
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    // Adjust scroll position calculation slightly if needed
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 10; // Small buffer

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Optional: Close mobile menu if open (add logic here if you implement one)
                }
            }
        });
    });

    // --- Update Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Function to update local time for Lahore (Asia/Karachi timezone) ---
    function updateLahoreTime() {
        const timeElement = document.getElementById('local-time');
        if (timeElement) {
            try {
                const now = new Date();
                const options = {
                    timeZone: 'Asia/Karachi', // Timezone for Lahore, Pakistan
                    hour: '2-digit',
                    minute: '2-digit',
                    // second: '2-digit', // Optional: uncomment to show seconds
                    hour12: true // Use AM/PM format
                };
                timeElement.textContent = now.toLocaleTimeString('en-US', options) + " PKT";
            } catch (error) {
                console.error("Error getting timezone time:", error);
                // Display default time or error message if timezone fails
                const fallbackTime = new Date();
                timeElement.textContent = fallbackTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " (Local)";
                // You might want to hide the element or show N/A instead
                // timeElement.textContent = "N/A";
                // timeElement.closest('.local-info').style.display = 'none';
            }
        }
    }

    // Update time immediately and then every minute
    updateLahoreTime();
    setInterval(updateLahoreTime, 60000); // Update every 60 seconds

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully in view
        threshold: 0 // Trigger as soon as any part enters the viewport (adjusted by rootMargin)
    };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Corrected querySelectorAll to use a single comma-separated string
    const elementsToAnimate = document.querySelectorAll(
        '.content-section, .content-section > .container > *:not(.section-heading):not(.card-container), .section-heading, .local-info, .card, .certification-list li'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

     // --- Optional: Add index to cards for staggering ---
     // This ensures the index is relative to each container
     document.querySelectorAll('.card-container').forEach(container => {
        container.querySelectorAll('.card').forEach((card, index) => {
            card.style.setProperty('--card-index', index);
        });
    });


    // --- Optional: Add active class to nav link on scroll ---
    // (More complex logic - can be added later if needed)


    // --- Optional: Navbar scroll behavior (hide/show) ---
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 5; // Pixels scrolled before reacting

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (Math.abs(scrollTop - lastScrollTop) <= scrollThreshold) {
            return; // Ignore minor scrolls
        }

        if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight){
            // Scroll Down
            navbar.style.transform = 'translateY(-100%)'; // Hide navbar
        } else {
            // Scroll Up
             navbar.style.transform = 'translateY(0)'; // Show navbar
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);


}); // End DOMContentLoaded