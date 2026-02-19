// ===== INICIALIZAR EMAILJS =====
emailjs.init("hRfPk3JdOTIURTKwA");

// ===== Menu Hambúrguer =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== Formulário de Contato =====
const contatoForm = document.getElementById('contatoForm');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contatoForm);
    const nome = contatoForm.elements[0].value;
    const email = contatoForm.elements[1].value;
    const assunto = contatoForm.elements[2].value;
    const mensagem = contatoForm.elements[3].value;

    // Validação básica
    if (!validarEmail(email)) {
        mostrarNotificacao('Por favor, insira um email válido.', 'erro');
        return;
    }

    if (nome.length < 3) {
        mostrarNotificacao('O nome deve ter pelo menos 3 caracteres.', 'erro');
        return;
    }

    if (mensagem.length < 10) {
        mostrarNotificacao('A mensagem deve ter pelo menos 10 caracteres.', 'erro');
        return;
    }

    // Envio real com EmailJS
    const btnSubmit = contatoForm.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Enviando...';

    const templateParams = {
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: mensagem
    };

    emailjs.send("service_ucp215r", "template_cdb84oo", templateParams)
        .then(() => {
            mostrarNotificacao('Mensagem enviada com sucesso! Obrigado por entrar em contato.', 'sucesso');
            contatoForm.reset();
            btnSubmit.disabled = false;
            btnSubmit.textContent = textoOriginal;
        })
        .catch((error) => {
            mostrarNotificacao('Erro ao enviar mensagem. Tente novamente.', 'erro');
            btnSubmit.disabled = false;
            btnSubmit.textContent = textoOriginal;
            console.error(error);
        });
});

// Validar Email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Notificação
function mostrarNotificacao(mensagem, tipo) {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.innerHTML = `
        <p>${mensagem}</p>
        <button class="notificacao-close">&times;</button>
    `;

    document.body.appendChild(notificacao);

    // Animar entrada
    setTimeout(() => {
        notificacao.classList.add('show');
    }, 10);

    // Fechar notificação
    const btnClose = notificacao.querySelector('.notificacao-close');
    btnClose.addEventListener('click', () => {
        notificacao.classList.remove('show');
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    });

    // Auto-remover após 5 segundos
    setTimeout(() => {
        notificacao.classList.remove('show');
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    }, 5000);
}

// ===== Animação ao Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animado');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.projeto-card, .skill-category, .about-stats').forEach(el => {
    observer.observe(el);
});

// ===== Animação de Barras de Progresso =====
const progressBars = document.querySelectorAll('.progress');
let animacaoExecutada = false;

const observerProgress = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animacaoExecutada) {
            animacaoExecutada = true;
            // A animação é feita apenas pelo CSS
            console.log('Seção de habilidades vista');
        }
    });
}, { threshold: 0.5 });

const habilidadesSection = document.querySelector('.habilidades');
if (habilidadesSection) {
    observerProgress.observe(habilidadesSection);
}

// ===== Efeito Scroll na NavBar =====
let ultimoScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollAtual = window.scrollY;

    if (scrollAtual > 100) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    ultimoScroll = scrollAtual;
});

// ===== Adicionar Estilos para Notificação =====
const estilosNotificacao = document.createElement('style');
estilosNotificacao.innerHTML = `
    .notificacao {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 500px;
    }

    .notificacao.show {
        transform: translateX(0);
    }

    .notificacao-sucesso {
        background: #10b981;
        color: white;
    }

    .notificacao-erro {
        background: #ef4444;
        color: white;
    }

    .notificacao-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
    }

    .notificacao-close:hover {
        transform: scale(1.2);
    }

    .animado {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .notificacao {
            top: 60px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(estilosNotificacao);

// ===== Console Welcome Message =====
console.log('%c👋 Bem-vindo ao meu Portfólio!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cDesenvolvido com HTML, CSS e JavaScript puro ✨', 'font-size: 14px; color: #8b5cf6;');

// PARTICULAS DO HERO
// PARTICULAS DO HERO - Com linhas e interação com o mouse
window.addEventListener('load', () => {
    const canvases = document.querySelectorAll(".tech-bg");

    canvases.forEach(canvas => {
        const ctx = canvas.getContext("2d");
        let particles = [];
        let mouse = {
            x: undefined,
            y: undefined,
            radius: 100 // Raio de interação do mouse
        };

        // Eventos para rastrear a posição do mouse
        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        function resizeCanvas() {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            init(); // Reinicia as partículas ao redimensionar
        }

        class Particle {
            constructor(x, y, dx, dy, size, color) {
                this.x = x;
                this.y = y;
                this.dx = dx; // Velocidade em X
                this.dy = dy; // Velocidade em Y
                this.size = size;
                this.color = color;
                this.baseSize = size; // Para resetar o tamanho se precisar
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }

            update() {
                // Colisão com as bordas
                if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx *= -1;
                if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy *= -1;

                this.x += this.dx;
                this.y += this.dy;

                // Interação com o mouse
                if (mouse.x !== undefined && mouse.y !== undefined) {
                    let distanceX = mouse.x - this.x;
                    let distanceY = mouse.y - this.y;
                    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                    if (distance < mouse.radius + this.size) {
                        // Calcula a força e direção de repulsão
                        let forceDirectionX = distanceX / distance;
                        let forceDirectionY = distanceY / distance;
                        let force = (mouse.radius + this.size - distance) / mouse.radius; // Força inversamente proporcional à distância
                        let directionX = forceDirectionX * force * 2; // Multiplicador de força
                        let directionY = forceDirectionY * force * 2;

                        // Aplica a força de repulsão
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }

                this.draw();
            }
        }

        function init() {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 9000; // Ajuste para mais ou menos partículas
            const particleColor = "#6366f1"; // Cor padrão das partículas

            for (let i = 0; i < numberOfParticles; i++) {
                let size = Math.random() * 2 + 1; // Tamanho entre 1 e 3
                let x = Math.random() * (canvas.width - size * 2) + size;
                let y = Math.random() * (canvas.height - size * 2) + size;
                let dx = (Math.random() - 0.5) * 0.8; // Velocidade menor para um efeito mais suave
                let dy = (Math.random() - 0.5) * 0.8;
                particles.push(new Particle(x, y, dx, dy, size, particleColor));
            }
        }

        // Função para desenhar as linhas de conexão
        function connectParticles() {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
                        ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

                    // Distância máxima para conectar as partículas (ajuste este valor)
                    if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                        opacityValue = 1 - (distance / ((canvas.width / 8) * (canvas.height / 8))); // Diminui a opacidade com a distância
                        ctx.strokeStyle = `rgba(99, 102, 241, ${opacityValue})`; // Cor da linha com opacidade
                        ctx.lineWidth = 1; // Largura da linha
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            connectParticles(); // Desenha as linhas antes de atualizar as partículas
            particles.forEach(p => p.update());
            requestAnimationFrame(animate);
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        animate();
    });
});

// SWIPER DA PARTE DE PROJETOS
document.addEventListener('DOMContentLoaded', function () {
    const swiperProjetos = new Swiper('.meusProjetos', {
        // Configurações Básicas
        slidesPerView: 1,           // 1 slide por vez no mobile
        spaceBetween: 20,          // Espaço entre os cards
        centeredSlides: true,       // O slide ativo fica no meio
        loop: true,                 // Carrossel infinito
        grabCursor: true,           // Cursor de "mãozinha" para arrastar

        // Efeito de transição suave
        speed: 800,
        // Paginação (as bolinhas)
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true, // Bolinhas dinâmicas ficam lindas
        },

        // Setas de navegação
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },



        // Eventos para melhorar a UX
        on: {
            init: function () {
                console.log('Swiper de Projetos Iniciado');
            },
        },
    });
});