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
            if (navItem && !navItem.classList.contains('premium')) {
                e.preventDefault();
                const target = navItem.getAttribute('href');
                if (target && target !== '#') {
                    window.location.href = target;
                }
            }
        });
    };

    // Inicializa as configurações
    configurarLinks();
    configurarFormulario();
    configurarNavbar();
});
