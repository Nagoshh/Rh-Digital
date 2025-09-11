// Sistema de Navegação
const rotas = {
    '/': 'login.html',
    '/login': 'login.html',
    '/cadastro': 'cadastro.html',
    '/home': 'home.html',
    '/configuracoes': 'settings.html'
};

// Função para navegar entre as páginas
function navegarPara(rota) {
    const pagina = rotas[rota] || 'login.html';
    window.location.href = pagina;
}

// Redireciona para a página inicial correta
document.addEventListener('DOMContentLoaded', function() {
    const caminhoAtual = window.location.pathname.split('/').pop() || 'index.html';
    
    // Se acessar a raiz, redireciona para o login
    if (caminhoAtual === '' || caminhoAtual === 'index.html') {
        window.location.href = 'login.html';
        return;
    }

    // Configura os links de navegação
    const configurarLinks = () => {
        // Foto ou nome da configuração na home
        const configNav = document.querySelector('.nav-item img[alt="Configurações"], .nav-item .nav-label');
        if (configNav) {
            configNav.style.cursor = 'pointer';
            configNav.addEventListener('click', function(e) {
                // Garante que só navega se for configuração
                if (
                    e.target.classList.contains('nav-label') && e.target.textContent.trim() === 'Configurações' ||
                    e.target.getAttribute('alt') === 'Configurações'
                ) {
                    window.location.href = 'settings.html';
                }
            });
        }

        // Opção Premium na navbar
        const premiumNavs = document.querySelectorAll('.nav-item.premium, .premium-card');
        premiumNavs.forEach(function(premiumEl) {
            premiumEl.style.cursor = 'pointer';
            premiumEl.addEventListener('click', function(e) {
                window.location.href = 'premium.html';
            });
        });
        // Link para cadastro na página de login
        const linkCadastro = document.querySelector('.cadastro a');
        if (linkCadastro) {
            linkCadastro.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'cadastro.html';
            });
        }

        // Link para login na página de cadastro
        const linkLogin = document.querySelector('.login-link');
        if (linkLogin) {
            linkLogin.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'login.html';
            });
        }

        // Link da logo para home
        const logoLink = document.querySelector('.header-left');
        if (logoLink) {
            logoLink.style.cursor = 'pointer';
            logoLink.addEventListener('click', function() {
                window.location.href = 'home.html';
            });
        }
    };

    // Configura o formulário de login/cadastro
    const configurarFormulario = () => {
        const formLogin = document.querySelector('.login-form');
        if (formLogin) {
            formLogin.addEventListener('submit', function(e) {
                e.preventDefault();
                // Validação do formulário aqui
                window.location.href = 'home.html';
            });
        }
    };

    // Configura a navegação da navbar
    const configurarNavbar = () => {
        document.addEventListener('click', function(e) {
            const navItem = e.target.closest('.nav-item');
            if (navItem) {
                if (navItem.classList.contains('premium')) {
                    e.preventDefault();
                    window.location.href = 'premium.html';
                } else {
                    e.preventDefault();
                    const target = navItem.getAttribute('href');
                    if (target && target !== '#') {
                        window.location.href = target;
                    }
                }
            }
        });
    };


    // Inicializa as configurações
    configurarLinks();
    configurarFormulario();
    configurarNavbar();
});
