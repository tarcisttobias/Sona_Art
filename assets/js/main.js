import { toggleVisibility } from './toggleVisibility.js';

// BOTÃO "VOLTAR AO TOPO"
const btntop = document.querySelector('.top');
if (btntop) {
  // Debounce simples para scroll
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      toggleVisibility(btntop, 'visivel');
    }, 50);
  });
}

// COPIAR CHAVE PIX (seleção robusta)
document.addEventListener('DOMContentLoaded', () => {
  const copyPixButton = document.querySelector('.copy-pix-btn'); // seletor direto e não ambíguo
  if (copyPixButton) {
    copyPixButton.addEventListener('click', copyPix);
  }
});

function copyPix() {
  const pixKey = '24 93500-0980';

  // tenta clipboard (requer HTTPS ou localhost)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(pixKey)
      .then(() => showCopyFeedback('Chave Pix copiada com sucesso!'))
      .catch(err => {
        console.error('Erro ao copiar com Clipboard API:', err);
        fallbackCopyText(pixKey);
      });
  } else {
    fallbackCopyText(pixKey);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('aria-hidden', 'true');
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCopyFeedback('Chave Pix copiada com sucesso!');
    } else {
      showCopyFeedback('Falha ao copiar. Copie manualmente.', 'error');
    }
  } catch (err) {
    console.error('Erro no fallback execCommand:', err);
    showCopyFeedback('Erro ao copiar. Copie manualmente.', 'error');
  } finally {
    document.body.removeChild(textArea);
  }
}

function showCopyFeedback(message, type = 'success') {
  const existing = document.querySelector('.copy-feedback');
  if (existing) existing.remove();

  const feedback = document.createElement('div');
  feedback.className = `copy-feedback ${type}`;
  feedback.textContent = message;
  feedback.setAttribute('role', 'status');        // acessibilidade
  feedback.setAttribute('aria-live', 'polite');   // acessibilidade
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

// animações (mantive seu approach)
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
