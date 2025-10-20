document.addEventListener('DOMContentLoaded', () => {

    // --- TROCA DE TEMA (CLARO/ESCURO) ---
    const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
    const body = document.body;
    
    // Verifica o tema salvo ou a preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
    } else {
         body.classList.add('light-mode');
    }

    // Atualiza ícones dos botões de tema
    const updateThemeIcons = () => {
        themeToggleButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    };

    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            body.classList.toggle('light-mode');
            localStorage.setItem('theme', body.className); // Salva o tema
            updateThemeIcons();
        });
    });

    updateThemeIcons(); // Chama na inicialização


    // --- MENU HAMBÚRGUER (MOBILE) ---
    const hamburger = document.getElementById('hamburger-button');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = mobileNav.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
        body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    
    // Fecha o menu ao clicar em um link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            body.style.overflow = '';
        });
    });
    

    // --- SCROLL SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // --- FILTRO DE PROJETOS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' ao botão clicado
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // --- EFEITO PARALLAX NO SCROLL (SEÇÃO 'ABOUT') ---
    const parallaxBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        if(parallaxBg) {
             parallaxBg.style.backgroundPositionY = offset * 0.5 + 'px';
        }
    });

    // --- ATUALIZAÇÃO DO ANO NO RODAPÉ ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

});