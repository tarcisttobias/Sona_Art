// import { handleToTop } from './handleToTop.js';
import { toggleVisibility } from './toggleVisibility.js';

// ALTERNAR VISIBILIDADE COM O SCROLL
const btntop = document.querySelector('.top')
// ao evento de scroll ele chama a função que altera visibilidade do botao
window.addEventListener("scroll", (event) => {
    toggleVisibility(btntop, 'visivel')
})

// ADICIONE ESTE EVENT LISTENER PARA O BOTÃO PIX
document.addEventListener('DOMContentLoaded', function() {
    const copyPixButton = document.querySelector('.pagamento-cards .btn');
    
    if (copyPixButton) {
        copyPixButton.addEventListener('click', copyPix);
    }
});

function copyPix() {
    // Chave Pix definida diretamente no script
    const pixKey = "24 93500-0980";
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pixKey)
            .then(() => {
                showCopyFeedback('Chave Pix copiada com sucesso!');
            })
            .catch(err => {
                console.error('Erro ao copiar: ', err);
                fallbackCopyText(pixKey);
            });
    } else {
        fallbackCopyText(pixKey);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback('Chave Pix copiada com sucesso!');
        } else {
            showCopyFeedback('Falha ao copiar. Selecione e copie manualmente.', 'error');
        }
    } catch (err) {
        console.error('Erro no fallback: ', err);
        showCopyFeedback('Erro ao copiar. Selecione e copie manualmente.', 'error');
    } finally {
        document.body.removeChild(textArea);
    }
}

function showCopyFeedback(message, type = 'success') {
    const existingFeedback = document.querySelector('.copy-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const feedback = document.createElement('div');
    feedback.className = `copy-feedback ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 10000;
        font-family: Poppins, sans-serif;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => feedback.remove(), 300);
        }
    }, 3000);
}

// Adiciona os estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);