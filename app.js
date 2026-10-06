import { auth, db } from "./firebase-config.js";

import {
  signInAnonymously,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {
  ref,
  set,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
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
const botaoEtapa1 = document.getElementById("enviarEtapa1");

botaoEtapa1.addEventListener("click", async () => {

  const usuario = auth.currentUser;

  if (!usuario) {
    alert("Aguarde alguns segundos. Estamos conectando você à atividade.");
    return;
  }

  const antonio = document.querySelector(
    'input[name="antonio-etapa1"]:checked'
  );

  const maria = document.querySelector(
    'input[name="maria-etapa1"]:checked'
  );

  if (!antonio || !maria) {
    alert("Responda aos dois casos antes de enviar.");
    return;
  }

  const resposta = JSON.stringify({
    antonio: antonio.value,
    maria: maria.value
  });

  try {

    await set(
      ref(db, `respostas/etapa1/${usuario.uid}`),
      {
        resposta: resposta,
        timestamp: serverTimestamp()
      }
    );

    botaoEtapa1.disabled = true;
    botaoEtapa1.textContent = "RESPOSTAS REGISTRADAS ✓";
const botaoContinuar = document.getElementById("continuarEtapa1");
botaoContinuar.style.display = "inline-block";
    document
      .querySelectorAll(
        'input[name="antonio-etapa1"], input[name="maria-etapa1"]'
      )
      .forEach((campo) => {
        campo.disabled = true;
      });

    alert("Respostas registradas com sucesso.");

  } catch (erro) {

    console.error("Erro ao registrar respostas:", erro);

    if (erro.code === "PERMISSION_DENIED") {
      alert("Esta etapa já foi respondida neste dispositivo.");
    } else {
      alert("Não foi possível registrar as respostas. Tente novamente.");
    }

  }

});
const botaoEtapa2 = document.getElementById("enviarEtapa2");

botaoEtapa2.addEventListener("click", async () => {

  const usuario = auth.currentUser;

  if (!usuario) {
    alert("Aguarde alguns segundos. Estamos conectando você à atividade.");
    return;
  }

  const antonio = document.querySelector(
    'input[name="antonio-etapa2"]:checked'
  );

  const maria = document.querySelector(
    'input[name="maria-etapa2"]:checked'
  );

  if (!antonio || !maria) {
    alert("Escolha uma hipótese para Antônio e para Maria antes de continuar.");
    return;
  }

  const resposta = JSON.stringify({
    antonio: antonio.value,
    maria: maria.value
  });

  try {

    await set(
      ref(db, `respostas/etapa2/${usuario.uid}`),
      {
        resposta: resposta,
        timestamp: serverTimestamp()
      }
    );

    botaoEtapa2.disabled = true;
    botaoEtapa2.textContent = "NOVA HIPÓTESE REGISTRADA ✓";
const botaoContinuarEtapa2 = document.getElementById("continuarEtapa2");
botaoContinuarEtapa2.style.display = "inline-block";
    document
      .querySelectorAll(
        'input[name="antonio-etapa2"], input[name="maria-etapa2"]'
      )
      .forEach((campo) => {
        campo.disabled = true;
      });

    alert("Sua nova hipótese foi registrada com sucesso.");

  } catch (erro) {

    console.error("Erro ao registrar Etapa 2:", erro);

    if (erro.code === "PERMISSION_DENIED") {
      alert("Esta etapa já foi respondida neste dispositivo.");
    } else {
      alert("Não foi possível registrar sua hipótese. Tente novamente.");
    }

  }

});
