// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// HOME - Voltar ao topo
document.querySelector('.nav-home').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// MODAL LOGIN
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closes = document.querySelectorAll('.close');

function openLogin() {
    loginModal.classList.add('show');
    registerModal.classList.remove('show');
}

function openRegister() {
    registerModal.classList.add('show');
    loginModal.classList.remove('show');
}

closes.forEach(close => {
    close.addEventListener('click', function() {
        loginModal.classList.remove('show');
        registerModal.classList.remove('show');
    });
});

window.addEventListener('click', function(event) {
    if (event.target === loginModal) loginModal.classList.remove('show');
    if (event.target === registerModal) registerModal.classList.remove('show');
});

// LOGIN FORM
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch('login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.sucesso) {
            alert('✅ ' + data.mensagem);
            loginModal.classList.remove('show');
            document.querySelector('.btn-login').textContent = username.toUpperCase();
            document.getElementById('loginForm').reset();
        } else {
            alert('❌ ' + data.mensagem);
        }
    } catch (error) {
        alert('Erro ao conectar: ' + error);
    }
});

// REGISTER FORM
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const password2 = document.getElementById('registerPassword2').value;
    
    if (password !== password2) {
        alert('❌ As senhas não correspondem!');
        return;
    }
    
    if (password.length < 6) {
        alert('❌ A senha deve ter no mínimo 6 caracteres!');
        return;
    }
    
    try {
        const response = await fetch('register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (data.sucesso) {
            alert('✅ ' + data.mensagem);
            registerModal.classList.remove('show');
            document.getElementById('registerForm').reset();
            openLogin(); // Abre o modal de login após registro
        } else {
            alert('❌ ' + data.mensagem);
        }
    } catch (error) {
        alert('❌ Erro ao conectar: ' + error);
    }
});

console.log('🎮 Talisman Rebirth carregado com sucesso!');
