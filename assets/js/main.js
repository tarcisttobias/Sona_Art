// import { handleToTop } from './handleToTop.js';
import { toggleVisibility } from './toggleVisibility.js';

// ALTERNAR VISIBILIDADE COM O SCROLL
const btntop = document.querySelector('.top')
// ao evento de scroll ele chama a função que altera visibilidade do botao
window.addEventListener("scroll", (event) => {
    toggleVisibility(btntop, 'visivel')
})


function copyPix() {
    const pixKey = document.getElementById('pix-key').innerText;
    
    // Tenta o método moderno primeiro
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pixKey)
            .then(() => {
                alert('Chave Pix copiada com sucesso!');
            })
            .catch(err => {
                console.error('Erro ao copiar: ', err);
                // Fallback
                copyFallback(pixKey);
            });
    } else {
        // Usa fallback
        copyFallback(pixKey);
    }
}

function copyFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('Chave Pix copiada com sucesso!');
    } catch (err) {
        console.error('Erro no fallback: ', err);
        alert('Falha ao copiar. Selecione e copie manualmente: ' + text);
    } finally {
        document.body.removeChild(textArea);
    }
}