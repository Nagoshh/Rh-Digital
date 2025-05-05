// Função para formatar o número de telefone
function formatarTelefone(input) {
    // Remove tudo que não for dígito
    let valor = input.value.replace(/\D/g, '');
    
    // Aplica a formatação (XX) XXXXX-XXXX
    if (valor.length > 10) {
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (valor.length > 5) {
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else if (valor.length > 0) {
        valor = valor.replace(/^(\d*)/, '($1');
    }
    
    input.value = valor;
}

// Inicializa a máscara de telefone quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    const inputTelefone = document.querySelector('input[placeholder="Telefone"]');
    if (inputTelefone) {
        // Aplica a máscara enquanto digita
        inputTelefone.addEventListener('input', function() {
            formatarTelefone(this);
        });
        
        // Permite apenas números e teclas de navegação
        inputTelefone.addEventListener('keydown', function(e) {
            // Permite: backspace, delete, tab, escape, enter, ponto
            if ([46, 8, 9, 27, 13, 110, 190].includes(e.keyCode) ||
                // Permite: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode == 65 && e.ctrlKey === true) ||
                (e.keyCode == 67 && e.ctrlKey === true) ||
                (e.keyCode == 86 && e.ctrlKey === true) ||
                (e.keyCode == 88 && e.ctrlKey === true) ||
                // Permite: home, end, setas esquerda/direita
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // Permite a tecla
                return;
            }
            
            // Garante que é um número
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }
});
