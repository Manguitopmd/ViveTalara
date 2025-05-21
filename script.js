document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('slider-loader');
    const hideLoader = () => {
        try {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        } catch (e) {
            console.error('Error al ocultar el loader:', e);
        }
    };

    // Hide loader on window load
    window.addEventListener('load', hideLoader);

    // Fallback: hide loader after 5 seconds
    setTimeout(hideLoader, 5000);

    // Swiper (Hero)
    try {
        if (window.Swiper) {
            const heroSwiper = new Swiper('.swiper', {
                loop: true,
                autoplay: { delay: 5000, disableOnInteraction: false },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        } else {
            console.error('Swiper.js no está disponible. Verifica que el script se haya cargado correctamente.');
        }
    } catch (e) {
        console.error('Error al inicializar el carrusel Hero:', e);
    }

    // Swiper (Shop Carousel) - Optimizado para loop infinito
    try {
        if (window.Swiper) {
            const shopCarousel = new Swiper('#shop .shop-carousel', {
                loop: true,
                autoplay: { 
                    delay: 3000, 
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true // Pausa al pasar el ratón para mejor UX
                },
                navigation: {
                    nextEl: '#shop .swiper-button-next',
                    prevEl: '#shop .swiper-button-prev',
                },
                pagination: {
                    el: '#shop .swiper-pagination',
                    clickable: true,
                },
                slidesPerView: 1,
                spaceBetween: 20,
                loopAdditionalSlides: 3, // Asegura transiciones fluidas en loop con pocas diapositivas
                speed: 600, // Velocidad de transición para una experiencia más suave
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                },
            });
        } else {
            console.error('Swiper.js no está disponible para el carrusel de la tienda.');
        }
    } catch (e) {
        console.error('Error al inicializar el carrusel de la tienda:', e);
    }

    // GSAP Animations
    try {
        if (window.gsap) {
            // Navbar animation
            gsap.from('nav', { y: -50, opacity: 0, duration: 1, ease: 'power2.out' });

            // Icons animation
            gsap.from('.fa-home, .fa-briefcase', {
                scale: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: 'back.out(1.7)',
            });

            // Titles animation
            gsap.from('.font-["Lobster"]', {
                scale: 0.8,
                opacity: 0,
                y: -20,
                duration: 0.8,
                ease: 'expo.out',
                stagger: 0.1,
            });

            // Scroll-triggered animations
            document.querySelectorAll('section').forEach(section => {
                gsap.from(section, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                });
            });

            // Zoom-in animations for cards
            document.querySelectorAll('#que-hacer .grid > div, #turismo .grid > div, #vip .grid > div, #embajadores .grid > div').forEach(card => {
                gsap.from(card, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                });
            });
        } else {
            console.error('GSAP no está disponible.');
        }
    } catch (e) {
        console.error('Error en las animaciones de GSAP:', e);
    }

    // Countdown
    try {
        const countdownDate = new Date('Jun 29, 2025 00:00:00').getTime();
        const updateCountdown = () => {
            try {
                const now = new Date().getTime();
                const distance = countdownDate - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById('days').textContent = days.toString().padStart(2, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

                if (distance < 0) {
                    clearInterval(countdownInterval);
                    document.getElementById('countdown-timer').innerHTML = '<p class="text-2xl">¡Vive Talara ya está aquí!</p>';
                    if (window.confetti) {
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                            colors: ['#f59e0b', '#f97316'],
                        });
                    }
                }
            } catch (e) {
                console.error('Error al actualizar el temporizador:', e);
                clearInterval(countdownInterval);
            }
        };
        const countdownInterval = setInterval(updateCountdown, 1000);
    } catch (e) {
        console.error('Error en la inicialización del temporizador:', e);
    }

    // Confetti on CTA Hover
    try {
        if (window.confetti) {
            document.querySelectorAll('.bg-orange-500').forEach(button => {
                button.addEventListener('mouseenter', () => {
                    confetti({
                        particleCount: 50,
                        spread: 50,
                        origin: { y: 0.5, x: 0.5 },
                        colors: ['#f59e0b', '#f97316'],
                    });
                });
            });
        } else {
            console.error('Canvas Confetti no está disponible.');
        }
    } catch (e) {
        console.error('Error en la animación de confeti:', e);
    }
});