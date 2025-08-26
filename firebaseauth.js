//importa as funçoes necessarias do firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

//Configs do FB
  const firebaseConfig = {
    apiKey: "AIzaSyDayYVtUeALRs023AcKWOYrhy6ba7HdY3k",
    authDomain: "ddmi-firebaseauth.firebaseapp.com",
    projectId: "ddmi-firebaseauth",
    storageBucket: "ddmi-firebaseauth.firebasestorage.app",
    messagingSenderId: "59644166518",
    appId: "1:59644166518:web:3986bc0b29411fa21eba57",
    measurementId: "G-TXXHW6Z86Z"
  };

//Inicia o FB
const app = initializeApp(firebaseConfig);

//func para exibir mendagens temporárias na interface
function showMessage(message, divId) {

    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    setTimeout(function(){
        messageDiv.style.opacity = 0;
    }, 5000); //a mesagem desaparece depois de 5 segundos

}

//Lógica do cadastro de novos usuários
const signUp = document.getElementById('submitSignUp')
signUp.addEventListener('click', (event) => {

    event.preventDefault(); // previne o comportamento padrão do botao

    //adicionar os dados do forms de cadastro
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth(); //Configura o serviço de autenticaçao
    const db = getFirestore(); // Conecta ao firestore

    //Cria uma conta com email e senha
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user; //Usuário autenticado
        const userData = { email, firstName, lastName }; //dados do usuario para salvar

        showMessage('Conta criada com sucesso', 'signUpMessage') //Exibe uma mensagem de sucesso

        //Salva os dados do usuário no firestore
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = 'index.html'; //Redireciona para a pagina de login após o cadastro
        })
        .catch((error) => {
            console.error("Error writing document", error);
        });
    })
    .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Endereço de email já existe', 'signUpMessage');
            } else {
                showMessage('Não é possível criar usuário', 'signUpMessage');
            }
        });
}); 

//Lógica de login de usuários existentes
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {

    event.preventDefault(); //Previne o comportamento do botão

    //adiciona os dados forms de login
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth(); //configura o serviço de autenticação

    //realiza o login com email e senha
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('Usuário Logado com sucesso', 'signInMessage') //Exibe mensagem de sucesso
        const user = userCredential.user;

        //salva o id do usuario no localStorage
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'homepage.html'; //redireciona para a pagina inicial
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            showMessage('Email ou Senha incorreta', 'signInMessage');
        } else {
            showMessage('Essa conta não existe', 'signInMessage');
        }
    });
})