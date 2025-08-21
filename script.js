/** ==== CONFIG: กำหนดวันเกิด/วันครบรอบ ==== */
const BIRTH = { year: 2006, monthIndex: 11, day: 23 };     // 23/12/2006  (เดือนเริ่มที่ 0 → 11 = ธันวาคม)
const ANNIV = { year: 2021, monthIndex: 10, day: 19 };     // 19/11/2022  (10 = พฤศจิกายน)

/** ==== Utilities ==== */
function nextOccurrence(monthIndex, day, now = new Date()) {
  // เป้าหมายคือ 00:00:00 ของวันนั้นตามเวลาเครื่องผู้ใช้
  let target = new Date(now.getFullYear(), monthIndex, day, 0, 0, 0, 0);
  if (target <= now) target = new Date(now.getFullYear() + 1, monthIndex, day, 0, 0, 0, 0);
  return target;
}

function formatDuration(ms) {
  if (ms <= 0) return "วันนี้!";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
}

function calcAge(birth, now = new Date()) {
  let age = now.getFullYear() - birth.year;
  const thisYearBirthday = new Date(now.getFullYear(), birth.monthIndex, birth.day, 0, 0, 0, 0);
  if (now < thisYearBirthday) age--;
  return Math.max(age, 0);
}

function calcYearsTogether(start, now = new Date()) {
  let years = now.getFullYear() - start.year;
  const thisYearAnniv = new Date(now.getFullYear(), start.monthIndex, start.day, 0, 0, 0, 0);
  if (now < thisYearAnniv) years--;
  return Math.max(years, 0);
}

/** ==== Main Tick ==== */
function tickCountdowns() {
  const now = new Date();

  // Birthday
  const nextBDay = nextOccurrence(BIRTH.monthIndex, BIRTH.day, now);
  const bDayMs = nextBDay - now;
  const age = calcAge(BIRTH, now);

  const birthdayCountdownEl = document.getElementById('birthdayCountdown');
  const ageEl = document.getElementById('age');
  if (birthdayCountdownEl) birthdayCountdownEl.innerText = formatDuration(bDayMs);
  if (ageEl) ageEl.innerText = age;

  // Anniversary
  const nextAnniv = nextOccurrence(ANNIV.monthIndex, ANNIV.day, now);
  const annivMs = nextAnniv - now;
  const yearsTogether = calcYearsTogether(ANNIV, now);

  const anniversaryCountdownEl = document.getElementById('anniversaryCountdown');
  const anniversaryYearsEl = document.getElementById('anniversaryYears');
  if (anniversaryCountdownEl) anniversaryCountdownEl.innerText = formatDuration(annivMs);
  if (anniversaryYearsEl) anniversaryYearsEl.innerText = `${yearsTogether} Years`;
}

document.addEventListener('DOMContentLoaded', () => {
  tickCountdowns();              // อัปเดตทันทีเมื่อโหลดหน้า
  setInterval(tickCountdowns, 1000);  // อัปเดตทุกวินาที (แสดงวินาทีด้วย)
});


const firebaseConfig = {
    apiKey: "AIzaSyC4goQXBFiCXrJv715ZQ8DfzG27w7KHkjU",
    authDomain: "fujiwara-2c925.firebaseapp.com",
    projectId: "fujiwara-2c925",
    storageBucket: "fujiwara-2c925.firebasestorage.app",
    messagingSenderId: "846326685482",
    appId: "1:846326685482:web:4ea480b3a99a98a7d9c853",
    measurementId: "G-4XK8PP0Q7C",
    databaseURL: "https://fujiwara-2c925-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

const contentRef = database.ref('contents');
contentRef.on('value', function(snapshot) {
    const contentGrid = document.getElementById('contentGrid');
    contentGrid.innerHTML = ''; 
    snapshot.forEach(function(childSnapshot) {
        const data = childSnapshot.val();
        const contentItem = document.createElement('div');
        contentItem.classList.add('grid-item');
        contentItem.innerHTML = `
            <h3>${data.title}</h3>
            <p class="content-text">${data.content}</p>
            <div class="datetime">${data.dateTime}</div>
        `;

        contentItem.addEventListener('click', function() {
            const gridItemAll = document.getElementById('gridItemAll');
            gridItemAll.innerHTML = `
                <div class="content-wrapper">
                    <button class="close-btn" onclick="closeFullContent()">Close</button>
                    <h3>${data.title}</h3>
                    <p>${data.content}</p>
                    <div class="datetime">${data.dateTime}</div>
                </div>
            `;
            gridItemAll.style.display = 'block'; 
        });

        contentGrid.appendChild(contentItem);
    });
});

window.closeFullContent = function() {
    const gridItemAll = document.getElementById('gridItemAll');
    gridItemAll.style.display = 'none'; 
};

const imageRef = database.ref('images');
imageRef.on('value', function(snapshot) {
    const imageGrid = document.getElementById('imageGrid');
    imageGrid.innerHTML = ''; 
    snapshot.forEach(function(childSnapshot) {
        const data = childSnapshot.val();
        const imageItem = document.createElement('div');
        imageItem.classList.add('grid-item-image');
        imageItem.innerHTML = `<img src="${data.imageUrl}" alt="Image">`;
        imageGrid.appendChild(imageItem);
    });
});