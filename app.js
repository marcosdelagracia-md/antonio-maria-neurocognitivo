import { auth } from "./firebase-config.js";

import {
  signInAnonymously,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

async function iniciarAluno() {
  try {
    await signInAnonymously(auth);
  } catch (erro) {
    console.error("Erro ao autenticar aluno:", erro);
  }
}

onAuthStateChanged(auth, (usuario) => {
  if (usuario) {
    console.log("Aluno conectado ao Firebase.");
    console.log("UID:", usuario.uid);
  }
});

iniciarAluno();
