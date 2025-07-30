
         // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Navbar background change on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Project filtering
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const projects = document.querySelectorAll('.project-card');
                
                projects.forEach(project => {
                    if (filter === 'all' || project.getAttribute('data-category') === filter) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
        
        // Form submission
        // Initialize EmailJS with your public key
        emailjs.init("cEwRw3PYPfe5Qdihu");
        
        // Form submission handler
        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const btn = document.querySelector('.btn');
            const statusMessage = document.getElementById('statusMessage');
            
            // Show loading state
            const originalBtnText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            
            // Collect form data
            const formData = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send email using EmailJS
            emailjs.send("service_p2zx7he", "template_ri8r556", formData)
                .then(function(response) {
                    // Success message
                    statusMessage.textContent = "Thank you! Your message has been sent successfully.";
                    statusMessage.className = "status-message success";
                    
                    // Reset form
                    document.getElementById('contactForm').reset();
                })
                .catch(function(error) {
                    // Error message
                    statusMessage.textContent = "Oops! Something went wrong. Please try again later.";
                    statusMessage.className = "status-message error";
                    console.error("Email sending failed:", error);
                })
                .finally(function() {
                    // Reset button state
                    btn.innerHTML = originalBtnText;
                    btn.disabled = false;
                    
                    // Clear message after 5 seconds
                    setTimeout(() => {
                        statusMessage.style.display = "none";
                    }, 5000);
                });
        });
        
        // Animate progress bars when in view
        const progressBars = document.querySelectorAll('.skill-progress');
        
        function animateProgressBars() {
            progressBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
                
                if (isVisible && !bar.classList.contains('animated')) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                    bar.classList.add('animated');
                }
            });
        }
        
        // Fade-in animation for elements
        const fadeElements = document.querySelectorAll('.fade-in');
        
        function checkFade() {
            fadeElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const isVisible = (rect.top <= window.innerHeight - 50 && rect.bottom >= 0);
                
                if (isVisible) {
                    element.classList.add('appeared');
                }
            });
        }
        
        // Initialize on load
        window.addEventListener('load', function() {
            animateProgressBars();
            checkFade();
        });
        
        // Event listeners
        window.addEventListener('scroll', function() {
            animateProgressBars();
            checkFade();
        });
