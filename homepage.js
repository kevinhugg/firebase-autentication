//importa as funçoes necessarias do firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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
const auth = getAuth(); //Configura o firebase authentication
const db = getFirestore(); //Configura o firestore

//Monitora o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    //busca o id do usuário autenticado salvo no locastorage
    const loggedInUserId = locaStorage.getItem('loggedInUserId');

    //Se o id estiver no localStorage, tenta obter os dados do firestore
    if (loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId); //Referância ao documento do usuário no firestore

        getDoc(docRef) //Busca o documento
        .then((docSnap) => {
            //Se o doc existir, exibe dados na interface
            if (docSnap.exists()) {
                const userData = docSnap.data()
                document.getElementById('loggedUSerFName').innerText = userData.firstName
                document.getElementById('loggedUSerEmail').innerText = userData.email
                document.getElementById('loggedUSerLName').innerText = userData.lastName
            } else {
                console.log("Id não encontrado no Documento");
            }
        })
        .catch((error) => {
            console.log("documento não encontrado");
        });
    } else {
        console.log("ID de usuário não encontrado no localStorage")
    }

});

//Lógica de Logout
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId'); //remove o Id do localstorage
    signOut(auth) //realiza o logout
    .then(() => {
        window.location.href = 'index.html'; //redireciona para a pagina de login
    })
    .catch((error) => {
        console.error('Error Signin out:', error);
    });
});