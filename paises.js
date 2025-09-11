// Lista de países
const paises = [
    { nome: 'Brasil', codigo: 'BR' },
    { nome: 'Portugal', codigo: 'PT' },
    { nome: 'Estados Unidos', codigo: 'US' },
    { nome: 'Espanha', codigo: 'ES' },
    { nome: 'França', codigo: 'FR' },
    { nome: 'Alemanha', codigo: 'DE' },
    { nome: 'Itália', codigo: 'IT' },
    { nome: 'Reino Unido', codigo: 'GB' },
    { nome: 'Canadá', codigo: 'CA' },
    { nome: 'Japão', codigo: 'JP' },
    { nome: 'Austrália', codigo: 'AU' }
];

// Função para criar o dropdown de países
function criarDropdownPaises() {
    // Verifica se estamos na página de cadastro
    if (!window.location.pathname.includes('cadastro.html')) {
        return; // Sai da função se não for a página de cadastro
    }
    
    const containerPais = document.querySelector('.input-metade.input-pais');
    if (!containerPais) return;

    const inputPais = containerPais.querySelector('input');
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-paises';
    dropdown.style.display = 'none';
    dropdown.style.position = 'absolute';
    dropdown.style.width = '100%';
    dropdown.style.maxHeight = '200px';
    dropdown.style.overflowY = 'auto';
    dropdown.style.background = 'white';
    dropdown.style.border = '1px solid #ccc';
    dropdown.style.borderRadius = '0 0 10px 10px';
    dropdown.style.zIndex = '1000';
    dropdown.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';

    paises.forEach(pais => {
        const opcao = document.createElement('div');
        opcao.textContent = pais.nome;
        opcao.style.padding = '10px';
        opcao.style.cursor = 'pointer';
        opcao.style.borderBottom = '1px solid #eee';
        opcao.addEventListener('click', () => {
            inputPais.value = pais.nome;
            dropdown.style.display = 'none';
            inputPais.focus();
        });
        opcao.addEventListener('mouseover', () => {
            opcao.style.backgroundColor = '#f0f0f0';
        });
        opcao.addEventListener('mouseout', () => {
            opcao.style.backgroundColor = 'transparent';
        });
        dropdown.appendChild(opcao);
    });

    containerPais.appendChild(dropdown);
    containerPais.style.position = 'relative';

    // Adiciona a seta ao input
    // Removida a criação da seta

    // Mostra/esconde o dropdown ao clicar no input ou na seta
    const toggleDropdown = (e) => {
        e.stopPropagation();
        const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
        dropdown.style.display = isHidden ? 'block' : 'none';
    };

    inputPais.addEventListener('click', toggleDropdown);
    
    // Adiciona o evento de clique na seta
    const seta = document.createElement('div');
    seta.style.position = 'absolute';
    seta.style.right = '10px';
    seta.style.top = '50%';
    seta.style.transform = 'translateY(-50%)';
    seta.style.cursor = 'pointer';
    seta.style.pointerEvents = 'auto'; // Garante que a seta seja clicável
    seta.style.width = '20px';
    seta.style.height = '20px';
    seta.style.display = 'flex';
    seta.style.alignItems = 'center';
    seta.style.justifyContent = 'center';
    containerPais.appendChild(seta);
    
    seta.addEventListener('click', toggleDropdown);

    // Fecha o dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        if (!containerPais.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });


    // Fecha o dropdown ao pressionar Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.style.display = 'none';
        }
    });

}

// Inicializa o dropdown quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', criarDropdownPaises);
