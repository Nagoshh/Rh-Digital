// Validação do formulário de cadastro
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.login-form');
    if (!form) return;

    const senhaInput = form.querySelector('input[type="password"]');
    if (!senhaInput) return;

    // Adiciona mensagem de validação
    const mensagemErro = document.createElement('div');
    mensagemErro.className = 'mensagem-erro';
    mensagemErro.style.color = '#e74c3c';
    mensagemErro.style.fontSize = '12px';
    mensagemErro.style.marginTop = '5px';
    mensagemErro.style.display = 'none';
    senhaInput.parentNode.insertBefore(mensagemErro, senhaInput.nextSibling);

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
        if (senhaInput.value.length < 8) {
            e.preventDefault();
            mensagemErro.textContent = 'A senha deve ter no mínimo 8 caracteres';
            mensagemErro.style.display = 'block';
            senhaInput.focus();
        }
    });
});
