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

        // --- NEW: Function to update local time for Lahore (Asia/Karachi timezone) ---
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
                    timeElement.textContent = fallbackTime.toLocaleTimeString() + " (Your Local)";
                }
            }
        }
    
        // Update time immediately and then every minute (or second if needed)
        updateLahoreTime();
        setInterval(updateLahoreTime, 60000); // Update every 60 seconds (60000ms)
    
        // --- Optional: Add 'active' class logic (Keep existing code if you have it) 
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