// Sistema de Navegação
const rotas = {
    '/': 'login.html',
    '/login': 'login.html',
    '/cadastro': 'cadastro.html',
    '/home': 'home.html'
};

// Função para navegar entre as páginas
function navegarPara(rota) {
    window.location.href = rotas[rota] || rotas['/'];
}

// Verificar se está na página de login/cadastro para adicionar os eventos
document.addEventListener('DOMContentLoaded', function() {
    // Link para cadastro na página de login
    const linkCadastro = document.querySelector('.cadastro a');
    if (linkCadastro && window.location.pathname.includes('login.html')) {
        linkCadastro.addEventListener('click', function(e) {
            e.preventDefault();
            navegarPara('/cadastro');
        });
    }

    // Link para login na página de cadastro
    const linkLogin = document.querySelector('.login-link');
    if (linkLogin && window.location.pathname.includes('cadastro.html')) {
        linkLogin.addEventListener('click', function(e) {
            e.preventDefault();
            navegarPara('/login');
        });
    }

    // Redirecionar para home após login/cadastro bem-sucedido
    const formLogin = document.querySelector('.login-form');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você pode adicionar a lógica de validação do formulário
            // Se o login/cadastro for bem-sucedido:
            navegarPara('/home');
        });
    }
});

// Redirecionar para a página inicial se a rota não for encontrada
window.addEventListener('load', function() {
    const caminhoAtual = window.location.pathname.split('/').pop();
    if (!Object.values(rotas).includes(caminhoAtual) && caminhoAtual) {
        navegarPara('/');
    }
});
