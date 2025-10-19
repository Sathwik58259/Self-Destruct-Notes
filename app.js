const password = "yourPassword"; // Set your desired password here

const loginDiv = document.getElementById('login');
const notesDiv = document.getElementById('notes');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');

const noteArea = document.getElementById('noteArea');
const destructTimeInput = document.getElementById('destructTime');
const setTimerBtn = document.getElementById('setTimerBtn');
const saveBtn = document.getElementById('saveBtn');
const saveLogoutBtn = document.getElementById('saveLogoutBtn');
const clearBtn = document.getElementById('clearBtn');
const timerStatus = document.getElementById('timerStatus');

let destructTimer = null;

// Login functionality
loginBtn.addEventListener('click', () => {
  if (passwordInput.value === password) {
    loginDiv.style.display = 'none';
    notesDiv.style.display = 'block';
    loginError.style.display = 'none';
    loadNotes();
  } else {
    loginError.style.display = 'block';
  }
});

// Load notes from localStorage
function loadNotes() {
  const savedNote = localStorage.getItem('selfDestructNote');
  if (savedNote) {
    noteArea.value = savedNote;
  }
  const timerEnd = localStorage.getItem('noteDestructTime');
  if (timerEnd) {
    const remaining = (parseInt(timerEnd) - Date.now()) / 1000;
    if (remaining > 0) {
      startTimer(remaining);
    } else {
      clearNotes();
    }
  }
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem('selfDestructNote', noteArea.value);
  timerStatus.textContent = "Note saved.";
}

// Clear notes and localStorage
function clearNotes() {
  noteArea.value = '';
  localStorage.removeItem('selfDestructNote');
  localStorage.removeItem('noteDestructTime');
  if (destructTimer) {
    clearTimeout(destructTimer);
  }
  timerStatus.textContent = "Note cleared.";
}

// Set self destruct timer
function startTimer(seconds) {
  timerStatus.textContent = `Note will self-destruct in ${Math.floor(seconds)} seconds.`;
  if (destructTimer) clearTimeout(destructTimer);
  destructTimer = setTimeout(() => {
    clearNotes();
    alert('Note has self-destructed.');
    logout();
  }, seconds * 1000);
  localStorage.setItem('noteDestructTime', Date.now() + seconds * 1000);
}

// Logout functionality
function logout() {
  notesDiv.style.display = 'none';
  loginDiv.style.display = 'block';
  passwordInput.value = '';
  timerStatus.textContent = '';
  if (destructTimer) clearTimeout(destructTimer);
  localStorage.removeItem('noteDestructTime');
}

setTimerBtn.addEventListener('click', () => {
  const seconds = parseInt(destructTimeInput.value);
  if (!seconds || seconds < 1) {
    alert('Please enter a valid destruct time in seconds.');
    return;
  }
  startTimer(seconds);
});

saveBtn.addEventListener('click', () => {
  saveNotes();
});

saveLogoutBtn.addEventListener('click', () => {
  saveNotes();
  logout();
});

clearBtn.addEventListener('click', () => {
  clearNotes();
});
