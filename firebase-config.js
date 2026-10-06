import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAU8hY5U5D61U3CnJofeQgq1r8Uxa0dgsY",
  authDomain: "antonio-maria-neurocognitivo.firebaseapp.com",
  databaseURL: "https://antonio-maria-neurocognitivo-default-rtdb.firebaseio.com",
  projectId: "antonio-maria-neurocognitivo",
  storageBucket: "antonio-maria-neurocognitivo.firebasestorage.app",
  messagingSenderId: "797587362737",
  appId: "1:797587362737:web:68e1467c8217cdaaf3a390"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };
