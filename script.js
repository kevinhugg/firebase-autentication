//Obtêm os elementos de botão e formularios de login / cadastro
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signUpForm = document.getElementById('signUp');
const signInForm = document.getElementById('signIn');

//quando o botão de cadastro é clicado esconde o formulário de login e mostra o cadastro
signUpButton.addEventListener('click', function() {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
});

//quando o botao de login é clicado, esconde o forms de cadastro e mostra o de login
signInButton.addEventListener('click', function(){
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
});