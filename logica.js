// --- Elementos do DOM ---
const ecraBoasVindas = document.getElementById('ecra-boas-vindas');
const ecraMenu = document.getElementById('ecra-menu');
const ecraLogin = document.getElementById('ecra-login');
const ecraFim = document.getElementById('ecra-fim');
// NOVO: Ecrã de Informações
const ecraInformacoes = document.getElementById('ecra-informacoes');


const botaoBemVindo = document.getElementById('botao-bem-vindo');
const loginForm = document.getElementById('login-form');

// Botões do Menu Principal
const btnMenuInicio = document.getElementById('btn-menu-inicio');
const btnMenuLogin = document.getElementById('btn-menu-login');
const btnMenuFim = document.getElementById('btn-menu-fim');
// NOVO: Botão "Informações" do Menu
const btnMenuInformacoes = document.getElementById('btn-menu-informacoes');

// NOVO: Botão "Voltar ao Menu" do Ecrã de Informações
const btnInformacoesVoltar = document.getElementById('btn-informacoes-voltar');

// Pop-up de boas-vindas
const welcomePopupOverlay = document.getElementById('welcome-popup-overlay');
const welcomePopupOkBtn = document.getElementById('welcome-popup-ok-btn');
const welcomePopupCancelBtn = document.getElementById('welcome-popup-cancel-btn');

// Pop-up de confirmação de login
const loginConfirmPopupOverlay = document.getElementById('login-confirm-popup-overlay');
const popupUsername = document.getElementById('popup-username');
const popupPassword = document.getElementById('popup-password');
const loginConfirmPopupOkBtn = document.getElementById('login-confirm-popup-ok-btn');

// Pop-up de Confirmação Final
const finalConfirmPopupOverlay = document.getElementById('final-confirm-popup-overlay');
const finalConfirmPopupOkBtn = document.getElementById('final-confirm-popup-ok-btn');
const finalConfirmPopupCancelBtn = document.getElementById('final-confirm-popup-cancel-btn');

const captchaContainer = document.getElementById('turnstile-container');

let captchaValidado = false; // Flag para saber se o captcha foi validado
let usernameGuardado = "";
let passwordGuardada = "";

// Esta função é chamada quando o CAPTCHA for resolvido com sucesso
window.onTurnstileSuccess = function(token) {
    // Aqui, normalmente validarias o token com backend — mas não precisamos disso agora
    captchaValidado = true;

    // Preenche o popup com os dados guardados
    popupUsername.textContent = usernameGuardado;
    popupPassword.textContent = passwordGuardada;

    // Esconde CAPTCHA depois de resolvido
    captchaContainer.style.display = 'none';

    // Mostra o popup de confirmação de login
    loginConfirmPopupOverlay.style.display = 'flex';
};


// --- LÓGICA PARA TROCAR DE ECRÃS ---

// Função auxiliar para esconder todos os ecrãs
function esconderTodosOsEcras() {
    ecraBoasVindas.style.display = 'none';
    ecraMenu.style.display = 'none';
    ecraLogin.style.display = 'none';
    ecraFim.style.display = 'none';
    // NOVO: Esconder o ecrã de informações
    ecraInformacoes.style.display = 'none';
}

// Ao carregar a página, mostra apenas o primeiro ecrã
document.addEventListener('DOMContentLoaded', () => {
    esconderTodosOsEcras();
    ecraBoasVindas.style.display = 'flex';
});

// 1. Clicar no botão BEM-VINDO -> Mostra o primeiro pop-up
botaoBemVindo.addEventListener('click', (event) => {
    event.preventDefault();
    welcomePopupOverlay.style.display = 'flex';
});

// 2. Clicar no OK do primeiro pop-up -> Vai para o ECRÃ DE MENU
welcomePopupOkBtn.addEventListener('click', () => {
    welcomePopupOverlay.style.display = 'none';
    esconderTodosOsEcras();
    ecraMenu.style.display = 'flex';
    document.body.style.backgroundColor = '#f0f2f5';
});

// 2.1 Clicar no CANCELAR do primeiro pop-up -> Fecha o pop-up
welcomePopupCancelBtn.addEventListener('click', () => {
    welcomePopupOverlay.style.display = 'none';
});

// --- LÓGICA DOS BOTÕES DO MENU ---

// 3.1 Botão "Voltar ao Início"
btnMenuInicio.addEventListener('click', () => {
    esconderTodosOsEcras();
    ecraBoasVindas.style.display = 'flex';
    document.body.style.backgroundColor = '#ffffff';
});

// 3.2 Botão "Ir para Login"
btnMenuLogin.addEventListener('click', () => {
    esconderTodosOsEcras();
    ecraLogin.style.display = 'flex';
});

// 3.3 Botão "Ir para o Fim" - Mostra o pop-up de confirmação final
btnMenuFim.addEventListener('click', () => {
    finalConfirmPopupOverlay.style.display = 'flex';
});

// NOVO: 3.4 Botão "Informações" - Vai para o ecrã de informações
btnMenuInformacoes.addEventListener('click', () => {
    esconderTodosOsEcras();
    ecraInformacoes.style.display = 'flex';
    document.body.style.backgroundColor = '#e0f7fa'; // Um fundo diferente para este ecrã
});

// 4. Submeter o formulário de LOGIN -> Mostra o pop-up de confirmação de login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (passwordInput.length === 4) {
        popupUsername.textContent = usernameInput;
        popupPassword.textContent = passwordInput;
        loginConfirmPopupOverlay.style.display = 'flex';
    } else {
        alert('A palavra-passe deve ter exatamente 4 caracteres.');
    }

    if (!captchaValidado) {
        captchaContainer.style.display = 'block';
        // Opcional: scroll até o CAPTCHA
        captchaContainer.scrollIntoView({ behavior: 'smooth' });
    }
});

// 5. Clicar no OK do pop-up de confirmação de login -> Mostra o pop-up de confirmação final
loginConfirmPopupOkBtn.addEventListener('click', () => {
    loginConfirmPopupOverlay.style.display = 'none';
    finalConfirmPopupOverlay.style.display = 'flex';
});


// --- LÓGICA DO POP-UP DE CONFIRMAÇÃO FINAL ---

// Clicar em "Sim, ir para o Fim" no pop-up de confirmação final
finalConfirmPopupOkBtn.addEventListener('click', () => {
    finalConfirmPopupOverlay.style.display = 'none';
    esconderTodosOsEcras();
    ecraFim.style.display = 'flex';
    document.body.style.backgroundColor = '#ffffff';
});

// Clicar em "Cancelar" no pop-up de confirmação final
finalConfirmPopupCancelBtn.addEventListener('click', () => {
    finalConfirmPopupOverlay.style.display = 'none';
    // O utilizador permanece no ecrã atual (login ou menu)
});

// NOVO: Lógica do botão "Voltar ao Menu" no ecrã de informações
btnInformacoesVoltar.addEventListener('click', () => {
    esconderTodosOsEcras();
    ecraMenu.style.display = 'flex';
    document.body.style.backgroundColor = '#f0f2f5'; // Volta à cor de fundo do menu
});