// MenStyle360 - JavaScript para interactividad y funcionalidades

// Variables globales
let currentQuizQuestion = 0;
let quizAnswers = {};
let carouselIndex = 0;

// Datos del quiz ampliado
const quizData = [
    {
        question: "¿Cuál es tu tipo de rostro?",
        options: [
            { value: "oval", text: "Ovalado" },
            { value: "square", text: "Cuadrado" },
            { value: "round", text: "Redondo" },
            { value: "heart", text: "Corazón" },
            { value: "diamond", text: "Diamante" },
            { value: "oblong", text: "Alargado" },
            { value: "triangle", text: "Triangular" },
            { value: "pear", text: "Pera" }
        ]
    },
    {
        question: "¿Cuál es tu tipo de cabello?",
        options: [
            { value: "straight", text: "Liso" },
            { value: "curly", text: "Rizado" },
            { value: "wavy", text: "Ondulado" },
            { value: "thick", text: "Grueso" },
            { value: "fine", text: "Fino" },
            { value: "oily", text: "Graso" },
            { value: "dry", text: "Seco" },
            { value: "mixed", text: "Mixto" }
        ]
    },
    {
        question: "¿Cuál es tu tono de piel?",
        options: [
            { value: "light", text: "Clara" },
            { value: "medium", text: "Media" },
            { value: "dark", text: "Oscura" },
            { value: "olive", text: "Aceitunada" }
        ]
    },
    {
        question: "¿Qué estilo prefieres?",
        options: [
            { value: "casual", text: "Casual" },
            { value: "formal", text: "Formal" },
            { value: "streetwear", text: "Streetwear" },
            { value: "minimalist", text: "Minimalista" },
            { value: "vintage", text: "Vintage" },
            { value: "sporty", text: "Deportivo" }
        ]
    },
    {
        question: "¿Cuál es tu edad?",
        options: [
            { value: "18-25", text: "18-25 años" },
            { value: "26-35", text: "26-35 años" },
            { value: "36-45", text: "36-45 años" },
            { value: "45+", text: "45+ años" }
        ]
    },
    {
        question: "¿Qué tipo de barba prefieres?",
        options: [
            { value: "clean", text: "Sin barba" },
            { value: "stubble", text: "Barba de 3 días" },
            { value: "short", text: "Barba corta" },
            { value: "medium", text: "Barba media" },
            { value: "long", text: "Barba larga" },
            { value: "goatee", text: "Candado" },
            { value: "mustache", text: "Solo bigote" }
        ]
    },
    {
        question: "¿Cuál es tu personalidad?",
        options: [
            { value: "confident", text: "Seguro" },
            { value: "creative", text: "Creativo" },
            { value: "professional", text: "Profesional" },
            { value: "adventurous", text: "Aventurero" },
            { value: "calm", text: "Tranquilo" },
            { value: "energetic", text: "Energético" }
        ]
    },
    {
        question: "¿Qué colores te gustan más?",
        options: [
            { value: "neutrals", text: "Neutros" },
            { value: "dark", text: "Oscuros" },
            { value: "bright", text: "Vibrantes" },
            { value: "pastels", text: "Pasteles" },
            { value: "earth", text: "Tierras" },
            { value: "cool", text: "Fríos" }
        ]
    }
];

// Resultados del quiz ampliado
const quizResults = {
    "oval-straight-light-casual-18-25-clean-confident-neutrals": {
        title: "Estilo Joven y Moderno",
        description: "Tu estilo ideal combina frescura juvenil con elegancia moderna. Te favorecen los cortes limpios y los colores suaves.",
        score: "85% Moderno",
        traits: [
            { icon: "✨", name: "Fresco" },
            { icon: "🎯", name: "Preciso" },
            { icon: "💫", name: "Elegante" },
            { icon: "🔥", name: "Trendy" }
        ],
        hair: ["Corte fade con volumen superior", "Undercut moderno", "Pompadour suave"],
        beard: ["Sin barba o barba de 3 días", "Líneas limpias y definidas"],
        colors: ["#1E1E1E", "#4B5563", "#2E4A62", "#F5F5F3", "#7A7265"],
        fashion: ["Ropa casual con toques minimalistas", "Jeans slim fit", "Camisetas básicas de calidad", "Sneakers blancos"]
    },
    "square-curly-medium-formal-26-35-medium-professional-dark": {
        title: "Estilo Profesional y Sofisticado",
        description: "Tu estilo ideal es elegante y profesional, perfecto para el entorno laboral y ocasiones especiales.",
        score: "92% Profesional",
        traits: [
            { icon: "💼", name: "Profesional" },
            { icon: "👔", name: "Elegante" },
            { icon: "🎖️", name: "Confiable" },
            { icon: "⭐", name: "Distinguido" }
        ],
        hair: ["Corte clásico con textura", "Raya lateral", "Quiff profesional"],
        beard: ["Barba media bien definida", "Líneas precisas", "Mantenimiento regular"],
        colors: ["#1E1E1E", "#4B5563", "#2E4A62", "#7A7265", "#C9D1D3"],
        fashion: ["Trajes bien cortados", "Camisas de vestir", "Corbatas de seda", "Zapatos de cuero"]
    },
    "round-wavy-dark-streetwear-18-25-stubble-adventurous-bright": {
        title: "Estilo Urbano y Dinámico",
        description: "Tu estilo ideal es moderno, urbano y lleno de personalidad. Te gusta destacar con looks únicos.",
        score: "88% Urbano",
        traits: [
            { icon: "🚀", name: "Dinámico" },
            { icon: "🎨", name: "Creativo" },
            { icon: "⚡", name: "Energético" },
            { icon: "🌟", name: "Único" }
        ],
        hair: ["Corte asimétrico", "Undercut con diseño", "Fade con patrones"],
        beard: ["Barba de 3 días", "Estilo desenfadado", "Líneas naturales"],
        colors: ["#2E4A62", "#7A7265", "#4B5563", "#D9CAB3", "#1E1E1E"],
        fashion: ["Ropa streetwear", "Hoodies oversize", "Joggers", "Sneakers llamativos"]
    },
    "heart-thick-light-minimalist-26-35-clean-calm-pastels": {
        title: "Estilo Minimalista y Refinado",
        description: "Tu estilo ideal es limpio, minimalista y atemporal. Prefieres la calidad sobre la cantidad.",
        score: "90% Minimalista",
        traits: [
            { icon: "🧘", name: "Tranquilo" },
            { icon: "🎯", name: "Focalizado" },
            { icon: "✨", name: "Refinado" },
            { icon: "🌿", name: "Natural" }
        ],
        hair: ["Corte simple y limpio", "Fade sutil", "Estilo natural"],
        beard: ["Sin barba", "Líneas muy limpias", "Afeitado perfecto"],
        colors: ["#F5F5F3", "#C9D1D3", "#7A7265", "#4B5563", "#1E1E1E"],
        fashion: ["Ropa de corte perfecto", "Colores neutros", "Materiales naturales", "Accesorios funcionales"]
    }
};

// Función para generar resultado personalizado basado en respuestas
function generateCustomResult(answers) {
    const faceType = answers.question0 || 'oval';
    const hairType = answers.question1 || 'straight';
    const skinTone = answers.question2 || 'light';
    const style = answers.question3 || 'casual';
    const age = answers.question4 || '18-25';
    const beard = answers.question5 || 'clean';
    const personality = answers.question6 || 'confident';
    const colors = answers.question7 || 'neutrals';
    
    // Generar resultado personalizado
    return {
        title: `Estilo ${getStyleName(style, personality)}`,
        description: `Tu estilo ideal combina ${getStyleDescription(style, personality, age)}. Perfecto para tu tipo de rostro ${faceType} y personalidad ${personality}.`,
        score: `${getScore(style, personality)}% ${getStyleCategory(style)}`,
        traits: getTraits(personality, style),
        hair: getHairRecommendations(faceType, hairType, style),
        beard: getBeardRecommendations(faceType, beard, style),
        colors: getColorPalette(skinTone, colors),
        fashion: getFashionRecommendations(style, age, personality)
    };
}

function getStyleName(style, personality) {
    const combinations = {
        'casual-confident': 'Casual Confiado',
        'formal-professional': 'Profesional Elegante',
        'streetwear-adventurous': 'Urbano Aventurero',
        'minimalist-calm': 'Minimalista Sereno',
        'vintage-creative': 'Vintage Creativo',
        'sporty-energetic': 'Deportivo Energético'
    };
    return combinations[`${style}-${personality}`] || 'Personalizado';
}

function getStyleDescription(style, personality, age) {
    const ageGroup = age.includes('18-25') ? 'juvenil' : age.includes('26-35') ? 'maduro' : 'experimentado';
    return `${style} con toques ${personality} perfecto para tu etapa ${ageGroup}`;
}

function getScore(style, personality) {
    const baseScore = 75;
    const styleBonus = { 'formal': 15, 'minimalist': 12, 'casual': 8, 'streetwear': 10, 'vintage': 5, 'sporty': 7 };
    const personalityBonus = { 'professional': 15, 'confident': 12, 'creative': 10, 'calm': 8, 'adventurous': 6, 'energetic': 5 };
    return Math.min(100, baseScore + (styleBonus[style] || 0) + (personalityBonus[personality] || 0));
}

function getStyleCategory(style) {
    const categories = {
        'casual': 'Casual',
        'formal': 'Profesional',
        'streetwear': 'Urbano',
        'minimalist': 'Minimalista',
        'vintage': 'Vintage',
        'sporty': 'Deportivo'
    };
    return categories[style] || 'Personalizado';
}

function getTraits(personality, style) {
    const traitMap = {
        'confident': [{ icon: "💪", name: "Seguro" }, { icon: "👑", name: "Líder" }, { icon: "🎯", name: "Decidido" }, { icon: "⭐", name: "Destacado" }],
        'creative': [{ icon: "🎨", name: "Creativo" }, { icon: "💡", name: "Innovador" }, { icon: "🌈", name: "Artístico" }, { icon: "✨", name: "Inspirador" }],
        'professional': [{ icon: "💼", name: "Profesional" }, { icon: "📊", name: "Organizado" }, { icon: "🎖️", name: "Confiable" }, { icon: "👔", name: "Elegante" }],
        'adventurous': [{ icon: "🚀", name: "Aventurero" }, { icon: "🗺️", name: "Explorador" }, { icon: "⚡", name: "Dinámico" }, { icon: "🌟", name: "Único" }],
        'calm': [{ icon: "🧘", name: "Tranquilo" }, { icon: "🌿", name: "Sereno" }, { icon: "💙", name: "Relajado" }, { icon: "🌸", name: "Armonioso" }],
        'energetic': [{ icon: "⚡", name: "Energético" }, { icon: "🔥", name: "Vibrante" }, { icon: "💥", name: "Intenso" }, { icon: "🚀", name: "Activo" }]
    };
    return traitMap[personality] || traitMap['confident'];
}

function getHairRecommendations(faceType, hairType, style) {
    const recommendations = {
        'oval': ['Corte fade moderno', 'Undercut elegante', 'Pompadour clásico'],
        'square': ['Corte texturizado', 'Raya lateral', 'Quiff profesional'],
        'round': ['Fade alto', 'Slick back', 'Barrido lateral'],
        'heart': ['Corte balanceado', 'Volumen superior', 'Fade sutil'],
        'diamond': ['Corte que suavice pómulos', 'Volumen en sienes', 'Estilo equilibrado'],
        'oblong': ['Corte que acorte rostro', 'Volumen lateral', 'Fade bajo'],
        'triangle': ['Corte que ensanche frente', 'Volumen superior', 'Estilo balanceado'],
        'pear': ['Corte que ensanche frente', 'Volumen en coronilla', 'Fade alto']
    };
    return recommendations[faceType] || recommendations['oval'];
}

function getBeardRecommendations(faceType, beard, style) {
    const recommendations = {
        'clean': ['Sin barba', 'Líneas muy limpias', 'Afeitado perfecto'],
        'stubble': ['Barba de 3 días', 'Estilo desenfadado', 'Líneas naturales'],
        'short': ['Barba corta definida', 'Líneas precisas', 'Mantenimiento regular'],
        'medium': ['Barba media equilibrada', 'Forma definida', 'Cuidado diario'],
        'long': ['Barba larga cuidada', 'Aceites nutritivos', 'Cepillado regular'],
        'goatee': ['Candado clásico', 'Líneas definidas', 'Mantenimiento preciso'],
        'mustache': ['Bigote bien cuidado', 'Forma definida', 'Estilo clásico']
    };
    return recommendations[beard] || recommendations['clean'];
}

function getColorPalette(skinTone, colors) {
    const palettes = {
        'light-neutrals': ['#1E1E1E', '#4B5563', '#7A7265', '#C9D1D3', '#F5F5F3'],
        'light-bright': ['#2E4A62', '#4B5563', '#7A7265', '#D9CAB3', '#C9D1D3'],
        'medium-earth': ['#7A7265', '#4B5563', '#2E4A62', '#D9CAB3', '#C9D1D3'],
        'medium-cool': ['#2E4A62', '#4B5563', '#1E1E1E', '#7A7265', '#C9D1D3'],
        'dark-vibrant': ['#2E4A62', '#7A7265', '#4B5563', '#D9CAB3', '#1E1E1E'],
        'dark-pastels': ['#C9D1D3', '#D9CAB3', '#7A7265', '#4B5563', '#2E4A62']
    };
    return palettes[`${skinTone}-${colors}`] || palettes['light-neutrals'];
}

function getFashionRecommendations(style, age, personality) {
    const recommendations = {
        'casual': ['Jeans slim fit', 'Camisetas básicas de calidad', 'Sneakers blancos', 'Chaquetas ligeras'],
        'formal': ['Trajes bien cortados', 'Camisas de vestir', 'Corbatas de seda', 'Zapatos de cuero'],
        'streetwear': ['Hoodies oversize', 'Joggers', 'Sneakers llamativos', 'Accesorios urbanos'],
        'minimalist': ['Ropa de corte perfecto', 'Colores neutros', 'Materiales naturales', 'Accesorios funcionales'],
        'vintage': ['Piezas retro', 'Colores clásicos', 'Accesorios únicos', 'Estilo atemporal'],
        'sporty': ['Ropa técnica', 'Colores vibrantes', 'Zapatillas deportivas', 'Accesorios funcionales']
    };
    return recommendations[style] || recommendations['casual'];
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Función principal de inicialización
function initializeApp() {
    initializeNavigation();
    initializeCarousel();
    initializeThemeToggle();
    initializeQuiz();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeMobileMenu();
    initializeProductRecommendations();
    
    // Inicializar AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// Navegación
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Actualizar navegación activa al hacer scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Carrusel del hero
function initializeCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    
    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        carouselIndex = (carouselIndex + 1) % carouselItems.length;
        showSlide(carouselIndex);
    }
    
    // Cambiar slide automáticamente cada 5 segundos
    setInterval(nextSlide, 5000);
    
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            carouselIndex = index;
            showSlide(carouselIndex);
        });
    });
}

// Toggle de tema oscuro/claro
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Verificar tema guardado o usar preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    
    // Aplicar tema inicial
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Event listener para el botón de tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Quiz interactivo
function initializeQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    const questionElement = document.getElementById('question');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const quizResult = document.getElementById('quiz-result');
    
    function showQuestion() {
        const question = quizData[currentQuizQuestion];
        const progress = ((currentQuizQuestion + 1) / quizData.length) * 100;
        
        questionElement.innerHTML = `
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map(option => 
                    `<button class="option-btn" data-value="${option.value}">${option.text}</button>`
                ).join('')}
            </div>
        `;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Pregunta ${currentQuizQuestion + 1} de ${quizData.length}`;
        
        // Event listeners para las opciones
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const value = e.target.getAttribute('data-value');
                quizAnswers[`question${currentQuizQuestion}`] = value;
                
                // Animación de selección
                e.target.style.background = 'var(--accent-color)';
                e.target.style.color = 'white';
                
                setTimeout(() => {
                    currentQuizQuestion++;
                    
                    if (currentQuizQuestion < quizData.length) {
                        showQuestion();
                    } else {
                        showQuizResult();
                    }
                }, 500);
            });
        });
    }
    
    function showQuizResult() {
        const resultKey = Object.values(quizAnswers).join('-');
        let result = quizResults[resultKey];
        
        // Si no hay resultado exacto, generar uno personalizado
        if (!result) {
            result = generateCustomResult(quizAnswers);
        }
        
        document.querySelector('.quiz-content').style.display = 'none';
        quizResult.style.display = 'block';
        
        // Actualizar header
        document.getElementById('style-score').textContent = result.score;
        
        // Actualizar contenido principal
        document.getElementById('result-title').textContent = result.title;
        document.getElementById('result-description').textContent = result.description;
        
        // Actualizar avatar
        const avatar = document.getElementById('style-avatar');
        const styleIcon = getStyleIcon(result.title);
        avatar.innerHTML = styleIcon;
        
        // Actualizar traits
        const traitsGrid = document.getElementById('traits-grid');
        traitsGrid.innerHTML = result.traits.map(trait => 
            `<div class="trait-item">
                <span class="trait-icon">${trait.icon}</span>
                <span class="trait-name">${trait.name}</span>
            </div>`
        ).join('');
        
        // Actualizar recomendaciones de cabello
        const hairRecs = document.getElementById('hair-recommendations');
        hairRecs.innerHTML = result.hair.map(rec => `<li>${rec}</li>`).join('');
        
        // Actualizar recomendaciones de barba
        const beardRecs = document.getElementById('beard-recommendations');
        beardRecs.innerHTML = result.beard.map(rec => `<li>${rec}</li>`).join('');
        
        // Actualizar paleta de colores
        const colorPalette = document.getElementById('color-palette-result');
        colorPalette.innerHTML = result.colors.map(color => 
            `<div class="color-swatch" style="background-color: ${color}" title="${color}"></div>`
        ).join('');
        
        // Actualizar recomendaciones de moda
        const fashionRecs = document.getElementById('fashion-recommendations');
        fashionRecs.innerHTML = result.fashion.map(rec => `<li>${rec}</li>`).join('');
        
        // Animación de entrada
        quizResult.style.opacity = '0';
        quizResult.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            quizResult.style.transition = 'all 0.5s ease';
            quizResult.style.opacity = '1';
            quizResult.style.transform = 'translateY(0)';
        }, 100);
    }
    
    function getStyleIcon(title) {
        const iconMap = {
            'Moderno': '✨',
            'Profesional': '💼',
            'Urbano': '🚀',
            'Minimalista': '🧘',
            'Vintage': '🎭',
            'Deportivo': '⚡'
        };
        
        for (const [key, icon] of Object.entries(iconMap)) {
            if (title.includes(key)) {
                return icon;
            }
        }
        return '👤';
    }
    
    // Inicializar quiz
    showQuestion();
}

// Función para reiniciar el quiz
function restartQuiz() {
    currentQuizQuestion = 0;
    quizAnswers = {};
    
    document.querySelector('.quiz-content').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    
    initializeQuiz();
}

// Animaciones de scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    document.querySelectorAll('.type-card, .shape-card, .beard-card, .tone-card, .guide-card, .accessory-card, .lifestyle-card, .blog-card').forEach(el => {
        observer.observe(el);
    });
}

// Scroll suave
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Menú móvil
function initializeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Recomendaciones de productos
function initializeProductRecommendations() {
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        item.addEventListener('click', () => {
            // Animación de click
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
            
            // Mostrar información adicional (simulado)
            const productName = item.querySelector('h4').textContent;
            showProductModal(productName);
        });
    });
}

function showProductModal(productName) {
    // Crear modal simple
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h3>${productName}</h3>
            <p>Información detallada sobre este producto y recomendaciones de uso.</p>
            <div class="modal-actions">
                <button class="btn btn-primary">Ver Detalles</button>
                <button class="btn btn-secondary modal-close">Cerrar</button>
            </div>
        </div>
    `;
    
    // Estilos del modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: var(--white);
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        position: relative;
        transform: translateY(20px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    }, 10);
    
    // Event listeners para cerrar
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.opacity = '0';
            modalContent.style.transform = 'translateY(20px)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
    });
    
    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.querySelector('.modal-close').click();
        }
    });
}

// Efectos de hover mejorados
function initializeHoverEffects() {
    const cards = document.querySelectorAll('.type-card, .shape-card, .beard-card, .tone-card, .guide-card, .accessory-card, .lifestyle-card, .blog-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Lazy loading para imágenes
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Funciones de utilidad
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimización de scroll
const optimizedScrollHandler = throttle(() => {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Efectos de parallax suave
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.hero-image');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 10));
}

// Inicializar efectos adicionales
document.addEventListener('DOMContentLoaded', () => {
    initializeHoverEffects();
    initializeLazyLoading();
    initializeParallax();
});

// Manejo de errores
window.addEventListener('error', (e) => {
    console.error('Error en MenStyle360:', e.error);
});

// Service Worker para funcionalidad offline (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado:', registration);
            })
            .catch(registrationError => {
                console.log('Error en SW:', registrationError);
            });
    });
}

// Función para compartir resultados
function shareResults() {
    const resultTitle = document.getElementById('result-title').textContent;
    const resultScore = document.getElementById('style-score').textContent;
    const shareText = `¡Descubrí mi estilo ideal con MenStyle360! ${resultTitle} - ${resultScore}. ¡Haz el quiz tú también!`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mi Perfil de Estilo - MenStyle360',
            text: shareText,
            url: shareUrl
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const shareData = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
        };
        
        // Crear modal de compartir
        const shareModal = document.createElement('div');
        shareModal.className = 'share-modal';
        shareModal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h3>Compartir Resultados</h3>
                <p>Comparte tu perfil de estilo en redes sociales</p>
                <div class="share-buttons">
                    <a href="${shareData.twitter}" target="_blank" class="share-btn twitter">
                        <i class="fab fa-twitter"></i> Twitter
                    </a>
                    <a href="${shareData.facebook}" target="_blank" class="share-btn facebook">
                        <i class="fab fa-facebook"></i> Facebook
                    </a>
                    <a href="${shareData.whatsapp}" target="_blank" class="share-btn whatsapp">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
                <div class="copy-link">
                    <input type="text" value="${shareUrl}" readonly>
                    <button onclick="copyToClipboard('${shareUrl}')">Copiar</button>
                </div>
            </div>
        `;
        
        // Estilos del modal
        shareModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modalContent = shareModal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: var(--white);
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            position: relative;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(shareModal);
        
        // Animar entrada
        setTimeout(() => {
            shareModal.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        }, 10);
        
        // Event listeners para cerrar
        shareModal.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                shareModal.style.opacity = '0';
                modalContent.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    document.body.removeChild(shareModal);
                }, 300);
            });
        });
        
        // Cerrar al hacer clic fuera del modal
        shareModal.addEventListener('click', (e) => {
            if (e.target === shareModal) {
                shareModal.querySelector('.modal-close').click();
            }
        });
    }
}

// Función para copiar al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Mostrar notificación de éxito
        const notification = document.createElement('div');
        notification.textContent = '¡Enlace copiado!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    });
}

// Exportar funciones para uso global
window.restartQuiz = restartQuiz;
window.showProductModal = showProductModal;
window.shareResults = shareResults;
window.copyToClipboard = copyToClipboard;

// Funciones adicionales para interactividad avanzada
function createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--primary-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.9rem;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    element.addEventListener('mouseenter', (e) => {
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        tooltip.style.opacity = '1';
    });
    
    element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
}

// Aplicar tooltips a elementos específicos
document.addEventListener('DOMContentLoaded', () => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        createTooltip(element, element.getAttribute('data-tooltip'));
    });
});

// Función para compartir en redes sociales
function shareOnSocial(platform, url = window.location.href, text = 'MenStyle360 - Cuidado y Estilo Masculino Moderno') {
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Exportar función de compartir
window.shareOnSocial = shareOnSocial;
