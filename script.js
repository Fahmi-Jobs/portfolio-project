// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        once: true, // Whether animation should happen only once
    });

    // Smooth Scroll Initialization
    const scroll = new SmoothScroll('a[href*="#"]', {
        speed: 800,
        speedAsDuration: true
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        scroll.animateScroll(0);
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark") {
        document.body.classList.add("dark-mode");
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (currentTheme == "light") {
        document.body.classList.remove("dark-mode");
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else if (prefersDarkScheme.matches) {
        document.body.classList.add("dark-mode");
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle("dark-mode");
        let theme = "light";
        if (document.body.classList.contains("dark-mode")) {
            theme = "dark";
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem("theme", theme);
    });

    // Initialize Swiper for Testimonials with Auto Animation
    const swiper = new Swiper('.testimonials-slider', {
        loop: true,
        autoplay: {
            delay: 5000, // Set delay sesuai kebutuhan
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'slide', // Gunakan 'slide' untuk animasi bergulir
    });

    // Initialize Slick Carousel for Gallery
    $('.gallery-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 992, // Tablet
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576, // Mobile
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });

    // Initialize Chart.js for Data Visualization
    const ctxProduction = document.getElementById('productionChart').getContext('2d');
    const productionChart = new Chart(ctxProduction, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
            datasets: [{
                label: 'Produksi Minyak Sawit (Ton)',
                data: [1200, 1500, 1800, 2000, 1700, 1600, 1900, 2100, 2300, 2200, 2400, 2500],
                backgroundColor: 'var(--color-yellow)',
                borderColor: 'var(--color-red)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'var(--color-white)'
                    },
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Produksi Minyak Sawit Tahunan',
                    color: 'var(--color-white)'
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'var(--color-white)'
                    },
                    grid: {
                        color: 'var(--color-secondary)'
                    }
                },
                y: {
                    ticks: {
                        color: 'var(--color-white)'
                    },
                    grid: {
                        color: 'var(--color-secondary)'
                    }
                }
            }
        },
    });

    const ctxDistribution = document.getElementById('distributionChart').getContext('2d');
    const distributionChart = new Chart(ctxDistribution, {
        type: 'pie',
        data: {
            labels: ['Asia Tenggara', 'Asia Selatan', 'Amerika Utara', 'Eropa', 'Afrika'],
            datasets: [{
                label: 'Distribusi Minyak Sawit',
                data: [40, 25, 15, 10, 10],
                backgroundColor: [
                    'var(--color-yellow)',
                    'var(--color-red)',
                    'var(--color-blue)',
                    'var(--color-yellow)',
                    'var(--color-red)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'var(--color-white)'
                    }
                },
                title: {
                    display: true,
                    text: 'Distribusi Minyak Sawit Berdasarkan Wilayah',
                    color: 'var(--color-white)'
                }
            }
        },
    });

    // Animasi Hitungan Statistik
    const counters = document.querySelectorAll('.count');

    counters.forEach(counter => {
        counter.innerText = '0';

        const updateCounter = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;

            const increment = target / 200; // Menyesuaikan kecepatan

            if(count < target){
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Implement AJAX submission atau gunakan layanan seperti Formspree/EmailJS
        // Contoh menggunakan Fetch API dengan Formspree
        const formData = new FormData(contactForm);
        fetch('https://formspree.io/f/YOUR_FORM_ID', { // Ganti YOUR_FORM_ID dengan ID Formspree Anda
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Terima kasih telah menghubungi kami!');
                contactForm.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Terjadi kesalahan. Silakan coba lagi.');
                    }
                });
            }
        }).catch(error => {
            alert('Terjadi kesalahan. Silakan coba lagi.');
        });
    });

    // Newsletter Subscription Form
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterFormFooter = document.getElementById('newsletterFormFooter');
    [newsletterForm, newsletterFormFooter].forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;

            // Implement AJAX submission atau integrasi dengan layanan seperti Mailchimp
            // Contoh menggunakan Fetch API dengan endpoint mock
            fetch('https://example.com/subscribe', { // Ganti dengan endpoint newsletter Anda
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            }).then(response => {
                if (response.ok) {
                    alert('Terima kasih telah berlangganan newsletter kami!');
                    form.reset();
                } else {
                    alert('Terjadi kesalahan. Silakan coba lagi.');
                }
            }).catch(error => {
                alert('Terjadi kesalahan. Silakan coba lagi.');
            });
        });
    });

    // Initialize Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'fadeDuration': 600,
        'imageFadeDuration': 600,
        'albumLabel': "Foto %1 dari %2"
    });

    // Initialize Cookie Consent
    window.addEventListener("load", function(){
        window.cookieconsent.initialise({
            "palette": {
                "popup": {
                    "background": "var(--color-yellow)",
                    "text": "var(--color-black)"
                },
                "button": {
                    "background": "var(--color-black)",
                    "text": "var(--color-yellow)"
                }
            },
            "theme": "classic",
            "content": {
                "message": "Kami menggunakan cookie untuk meningkatkan pengalaman Anda.",
                "dismiss": "Saya Mengerti",
                "link": "Pelajari Lebih Lanjut",
                "href": "http://www.wilianperkasa.com/privacy-policy"
            }
        });
    });
});
