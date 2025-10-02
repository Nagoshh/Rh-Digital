// Validação do formulário de cadastro
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.login-form');
    if (!form) return;

    const senhaInput = form.querySelector('input[type="password"]');
    const emailInput = form.querySelector('input[type="email"]');
    const nomeInput = form.querySelector('input[type="text"]');
    const telefoneInput = document.getElementById('telefone');
    
    if (!senhaInput || !emailInput || !nomeInput || !telefoneInput) return;

    // Adiciona mensagem de validação
    const mensagemErro = document.createElement('div');
    mensagemErro.className = 'mensagem-erro';
    mensagemErro.style.color = '#e74c3c';
    mensagemErro.style.fontSize = '12px';
    mensagemErro.style.marginTop = '5px';
    mensagemErro.style.display = 'none';
    form.insertBefore(mensagemErro, form.lastElementChild);

    // Função para validar email
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }


    // Validação em tempo real
    senhaInput.addEventListener('input', function() {
        if (this.value.length > 0 && this.value.length < 8) {
            mensagemErro.textContent = 'A senha deve ter no mínimo 8 caracteres';
            mensagemErro.style.display = 'block';
            this.setCustomValidity('A senha deve ter no mínimo 8 caracteres');
        } else {
            mensagemErro.style.display = 'none';
            this.setCustomValidity('');
        }
    });

    // Validação no envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valido = true;
        
        // Limpa mensagens de erro
        mensagemErro.style.display = 'none';
        
        // Valida nome
        if (nomeInput.value.trim() === '') {
            mensagemErro.textContent = 'Por favor, preencha o nome completo';
            mensagemErro.style.display = 'block';
            nomeInput.focus();
            return;
        }
        
        // Valida email
        if (!validarEmail(emailInput.value)) {
            mensagemErro.textContent = 'Por favor, insira um email válido';
            mensagemErro.style.display = 'block';
            emailInput.focus();
            return;
        }
        
        // Valida senha
        if (senhaInput.value.length < 8) {
            mensagemErro.textContent = 'A senha deve ter no mínimo 8 caracteres';
            mensagemErro.style.display = 'block';
            senhaInput.focus();
            return;
        }
        
        // Valida telefone
        if (telefoneInput.value.replace(/\D/g, '').length < 10) {
            mensagemErro.textContent = 'Por favor, insira um número de telefone válido';
            mensagemErro.style.display = 'block';
            telefoneInput.focus();
            return;
        }
        
        // Se tudo estiver válido, redireciona para o login
        if (valido) {
            // Aqui você pode adicionar o código para salvar os dados do usuário
            // Por enquanto, apenas redireciona para a tela de login
            window.location.href = 'login.html';
        }
    });
});
