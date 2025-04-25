document.addEventListener('DOMContentLoaded', () => {
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
            gsap.from('.lobster-font', {
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
            document.querySelectorAll('#retos .grid > div, #que-es .grid > div, #vendemas .grid > div, #eventos .grid > div, #embajadores .grid > div').forEach(card => {
                gsap.from(card, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'back.out(1.7 очевидний)',
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

    // Countdown for Vendemas Discount
    try {
        const countdownDate = new Date('April 30, 2025 23:59:59').getTime();
        const updateCountdown = () => {
            try {
                const now = new Date().getTime();
                const distance = countdownDate - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                const timerElement = document.getElementById('descuento-timer');
                timerElement.textContent = `Quedan ${days}d ${hours}h ${minutes}m ${seconds}s`;

                if (distance < 0) {
                    clearInterval(countdownInterval);
                    timerElement.textContent = '¡Oferta finalizada!';
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

    // Form Validation and WhatsApp Integration
    window.enviarInvitacion = function() {
        try {
            const nombre = document.getElementById('nombre').value.trim();
            const negocio = document.getElementById('negocio').value.trim();
            const rubro = document.getElementById('rubro').value;

            const nombreValido = nombre !== '';
            const negocioValido = negocio !== '';
            const rubroValido = rubro !== '';

            const mensajes = [
                `<p class="flex items-center"><i class="fas fa-${nombreValido ? 'check-circle text-green-500' : 'times-circle text-red-500'} mr-2"></i> Nombre: ${nombreValido ? '✔ OK' : '✘ Falta completar'}</p>`,
                `<p class="flex items-center"><i class="fas fa-${negocioValido ? 'check-circle text-green-500' : 'times-circle text-red-500'} mr-2"></i> Negocio: ${negocioValido ? '✔ OK' : '✘ Falta completar'}</p>`,
                `<p class="flex items-center"><i class="fas fa-${rubroValido ? 'check-circle text-green-500' : 'times-circle text-red-500'} mr-2"></i> Rubro: ${rubroValido ? '✔ OK' : '✘ Falta completar'}</p>`
            ];

            const modal = document.getElementById('validacionModal');
            const mensajesContainer = document.getElementById('validacionMensajes');
            mensajesContainer.innerHTML = mensajes.join('');
            modal.classList.remove('hidden');

            const enviarBtn = document.getElementById('enviarBtn');
            enviarBtn.disabled = !(nombreValido && negocioValido && rubroValido);
        } catch (e) {
            console.error('Error en la validación del formulario:', e);
        }
    };

    window.cerrarModal = function() {
        try {
            const modal = document.getElementById('validacionModal');
            modal.classList.add('hidden');
        } catch (e) {
            console.error('Error al cerrar el modal:', e);
        }
    };

    window.enviarWhatsApp = function() {
        try {
            const nombre = document.getElementById('nombre').value.trim();
            const negocio = document.getElementById('negocio').value.trim();
            const rubro = document.getElementById('rubro').value;

            if (nombre && negocio && rubro) {
                const mensaje = `Quiero mi invitación para el lanzamiento de Vive Talara. Nombre: ${nombre}, Negocio: ${negocio}, Rubro: ${rubro}`;
                const url = `https://wa.me/+51961360935?text=${encodeURIComponent(mensaje)}`;
                window.open(url, '_blank');
                cerrarModal();
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
            console.error('Error al enviar mensaje a WhatsApp:', e);
        }
    };
});