import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getFirestore, setDoc, doc, query, where, getDocs, collection } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDLeqZFHJjn03iWXagHoqJTwKaQzj5obqo",
  authDomain: "dual-panel-exam-app.firebaseapp.com",
  projectId: "dual-panel-exam-app",
  storageBucket: "dual-panel-exam-app",
  messagingSenderId: "1054816284399",
  appId: "1:1054816284399:web:961764dce93dada84b351a",
  measurementId: "G-RRT9SCJTGT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const analytics = getAnalytics(app);

let count = JSON.parse(localStorage.getItem('count')) || 1;
document.querySelector('.question-number').innerHTML = `Question Number : ${count}`;

document.getElementById('next').addEventListener('click', async () => {
  const qPaperInput = document.querySelector('.Question-paper-name');
  const qPaper = JSON.parse(localStorage.getItem('test')) || qPaperInput.value.trim();
  localStorage.setItem('test', JSON.stringify(qPaper));
  qPaperInput.disabled = true;

  const question = document.getElementById('question').value.trim();
  const optionA = document.querySelector('.optiona').value.trim();
  const optionB = document.querySelector('.optionb').value.trim();
  const optionC = document.querySelector('.optionc').value.trim();
  const optionD = document.querySelector('.optiond').value.trim();

  if (!question || !optionA || !optionB || !optionC || !optionD) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const duplicateCheckQuery = query(
      collection(db, qPaper),
      where("question", "==", question)
    );

    const duplicateCheckSnapshot = await getDocs(duplicateCheckQuery);

    if (!duplicateCheckSnapshot.empty) {
      alert("This question already exists!");
      return;
    }

    if (count === 50) {
      alert("Limit reached. Resetting...");
      count = 1;
      localStorage.setItem('count', JSON.stringify(count));
      localStorage.removeItem('test');
      qPaperInput.disabled = false;
      qPaperInput.value = '';
    } else {
      const docRef = doc(db, qPaper, Date.now().toString());
      await setDoc(docRef, {
        question,
        options: {
          A: optionA,
          B: optionB,
          C: optionC,
          D: optionD
        }
      });

      alert("Question saved successfully!");

      count++;
      localStorage.setItem('count', JSON.stringify(count));
      document.querySelector('.question-number').innerHTML = `Question Number : ${count} | Questions left = ${50- count} <button class="next" onclick="
      count = 0;
      ">Reset</button> `;

      document.getElementById('question').value = '';
      document.querySelector('.optiona').value = '';
      document.querySelector('.optionb').value = '';
      document.querySelector('.optionc').value = '';
      document.querySelector('.optiond').value = '';
      document.getElementById('question').focus();
    }
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    alert("Error saving question. Please try again.");
  }
});
