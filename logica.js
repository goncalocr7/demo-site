// --- Elementos do DOM ---
const ecraBoasVindas = document.getElementById('ecra-boas-vindas');
const ecraMenu = document.getElementById('ecra-menu');
const ecraLogin = document.getElementById('ecra-login');
const ecraFim = document.getElementById('ecra-fim');
const ecraInformacoes = document.getElementById('ecra-informacoes');

const botaoBemVindo = document.getElementById('botao-bem-vindo');
const loginForm = document.getElementById('login-form');

const btnMenuInicio = document.getElementById('btn-menu-inicio');
const btnMenuLogin = document.getElementById('btn-menu-login');
const btnMenuFim = document.getElementById('btn-menu-fim');
const btnMenuInformacoes = document.getElementById('btn-menu-informacoes');
const btnInformacoesVoltar = document.getElementById('btn-informacoes-voltar');

const welcomePopupOverlay = document.getElementById('welcome-popup-overlay');
const welcomePopupOkBtn = document.getElementById('welcome-popup-ok-btn');
const welcomePopupCancelBtn = document.getElementById('welcome-popup-cancel-btn');

const loginConfirmPopupOverlay = document.getElementById('login-confirm-popup-overlay');
const popupUsername = document.getElementById('popup-username');
const popupPassword = document.getElementById('popup-password');
const loginConfirmPopupOkBtn = document.getElementById('login-confirm-popup-ok-btn');

const finalConfirmPopupOverlay = document.getElementById('final-confirm-popup-overlay');
const finalConfirmPopupOkBtn = document.getElementById('final-confirm-popup-ok-btn');
const finalConfirmPopupCancelBtn = document.getElementById('final-confirm-popup-cancel-btn');


// --- LÓGICA PARA TROCAR DE ECRÃS ---
function esconderTodosOsEcras() {
    ecraBoasVindas.style.display = 'none';
    ecraMenu.style.display = 'none';
    ecraLogin.style.display = 'none';
    ecraFim.style.display = 'none';
    ecraInformacoes.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    esconderTodosOsEcras();
    ecraBoasVindas.style.display = 'flex';
});

// Botão BEM-VINDO
botaoBemVindo.addEventListener('click', (event) => {
    event.preventDefault();
    welcomePopupOverlay.style.display = 'flex';
});

// Pop-up de boas-vindas
welcomePopupOkBtn.addEventListener('click', () => {
    welcomePopupOverlay.style.display = 'none';
    esconderTodosOsEcras();
    ecraMenu.style.display = 'flex';
    document.body.style.backgroundColor = '#f0f2f5';
});

welcomePopupCancelBtn.addEventListener('click', () => {
    welcomePopupOverlay.style.display = 'none';
});

// Botões do menu
btnMenuInicio.addEventListener('click', () => {
    esconderTodosOsEcras();
    ecraBoasVindas.style.display = 'flex';
    document.body.style.backgroundColor = '#ffffff';
});

btnMenuLogin.addEventListener('click', () => {
    esconderTodosOsEcras();
    ecraLogin.style.display = 'flex';
});

btnMenuFim.addEventListener('click', () => {
    finalConfirmPopupOverlay.style.display = 'flex';
});

btnMenuInformacoes.addEventListener('click', () => {
    esconderTodosOsEcras();
    ecraInformacoes.style.display = 'flex';
    document.body.style.backgroundColor = '#e0f7fa';
});

btnInformacoesVoltar.addEventListener('click', () => {
    esconderTodosOsEcras();
    ecraMenu.style.display = 'flex';
    document.body.style.backgroundColor = '#f0f2f5';
});

// Submeter login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;
    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse) {
        alert('Por favor, confirme que não é um robô.');
        return;
    }

    if (passwordInput.length === 4) {
        popupUsername.textContent = usernameInput;
        popupPassword.textContent = passwordInput;
        loginConfirmPopupOverlay.style.display = 'flex';
    } else {
        alert('A palavra-passe deve ter exatamente 4 caracteres.');
    }
});

// Confirmação de login
loginConfirmPopupOkBtn.addEventListener('click', () => {
    loginConfirmPopupOverlay.style.display = 'none';
    finalConfirmPopupOverlay.style.display = 'flex';
});

// Confirmação final
finalConfirmPopupOkBtn.addEventListener('click', () => {
    finalConfirmPopupOverlay.style.display = 'none';
    esconderTodosOsEcras();
    ecraFim.style.display = 'flex';
    document.body.style.backgroundColor = '#ffffff';
});

finalConfirmPopupCancelBtn.addEventListener('click', () => {
    loginConfirmPopupOverlay.style.display = 'none';
    finalConfirmPopupOverlay.style.display = 'none';
});