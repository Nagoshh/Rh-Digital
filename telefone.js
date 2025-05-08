// Dicionário de códigos de país
const codigosPais = {
    'Brasil': '+55',
    'Portugal': '+351',
    'Estados Unidos': '+1',
    'Espanha': '+34',
    'França': '+33',
    'Alemanha': '+49',
    'Itália': '+39',
    'Reino Unido': '+44',
    'Canadá': '+1',
    'Japão': '+81',
    'Austrália': '+61'
};

// Função para formatar o número de telefone
function formatarTelefone(input) {
    if (!input) return;

    // Obtém o país selecionado
    const selectPais = document.querySelector('.input-pais input');
    const pais = selectPais ? selectPais.value : 'Brasil';
    const codigoPais = codigosPais[pais] || '+55';

    // Remove qualquer código de país do início do valor
    let valor = input.value.replace(/^\+\d+\s?/, '').replace(/\D/g, '');

    // Se estiver vazio, não faz nada
    if (!valor) return;

    
    // Aplica a formatação baseada no país
    let numeroFormatado = '';
    
    if (pais === 'Brasil') {
        // Formato brasileiro: (XX) 9XXXX-XXXX ou (XX) XXXX-XXXX
        if (valor.length > 10) {
            // Celular com 11 dígitos (XX 9XXXX-XXXX)
            numeroFormatado = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '$1 $2-$3');
        } else if (valor.length > 5) {
            // Telefone fixo (XX XXXX-XXXX)
            numeroFormatado = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '$1 $2-$3');
        } else if (valor.length > 2) {
            // Apenas DDD
            numeroFormatado = valor.replace(/^(\d{2})(\d{0,5})/, '$1 $2');
        } else {
            // Menos de 3 dígitos
            numeroFormatado = valor;
        }
    } else {
        // Formato genérico para outros países
        numeroFormatado = valor;
    }
    
    // Atualiza o valor do campo
    input.value = `${codigoPais} ${numeroFormatado}`;
    
    // Armazena o valor sem formatação
    input.dataset.rawValue = valor;
}

// Inicializa a máscara de telefone quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    const inputTelefone = document.getElementById('telefone');
    const selectPais = document.querySelector('.input-pais input');
    
    if (inputTelefone) {
        // Aplica a máscara enquanto digita
        inputTelefone.addEventListener('input', function() {
            formatarTelefone(this);
        });
        
        // Aplica a máscara quando o país é alterado
        if (selectPais) {
            selectPais.addEventListener('change', function() {
                formatarTelefone(inputTelefone);
            });
        }
        
        // Permite apenas números e teclas de navegação
        inputTelefone.addEventListener('keydown', function(e) {
            // Permite: backspace, delete, tab, escape, enter
            if ([46, 8, 9, 27, 13].includes(e.keyCode) ||
                // Permite: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode == 65 && e.ctrlKey === true) ||
                (e.keyCode == 67 && e.ctrlKey === true) ||
                (e.keyCode == 86 && e.ctrlKey === true) ||
                (e.keyCode == 88 && e.ctrlKey === true) ||
                // Permite: home, end, setas esquerda/direita
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            
            // Garante que é um número
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }
});
