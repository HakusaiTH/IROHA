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

document.addEventListener("DOMContentLoaded", function() {
    const currentDate = new Date();

    const birthDate = new Date('2006-12-23T00:00:00');
    const anniversaryDate = new Date('2022-11-19T00:00:00');

    function calculateAge(birthDate, currentDate) {
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const m = currentDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function formatTime(ms) {
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

        return `${days} Days, ${months} Months, ${hours} Hours, ${minutes} Minutes`;
    }

    function updateBirthdayCountdown() {
        const nextBirthday = new Date(birthDate);
        if (nextBirthday <= currentDate) {
            nextBirthday.setFullYear(currentDate.getFullYear() + 1);
        }

        const birthdayDifference = nextBirthday - currentDate;
        const birthdayTime = formatTime(birthdayDifference);
        document.getElementById('birthdayCountdown').innerText = birthdayTime;

        const age = calculateAge(birthDate, currentDate);
        document.getElementById('age').innerText = age;
    }

    function updateAnniversaryCountdown() {
        const nextAnniversary = new Date(anniversaryDate);
        if (nextAnniversary <= currentDate) {
            nextAnniversary.setFullYear(currentDate.getFullYear() + 1);
        }

        const anniversaryDifference = nextAnniversary - currentDate;
        const anniversaryTime = formatTime(anniversaryDifference);
        document.getElementById('anniversaryCountdown').innerText = anniversaryTime;

        const yearsToAnniversary = Math.floor((nextAnniversary - anniversaryDate) / (1000 * 60 * 60 * 24 * 365.25));
        document.getElementById('anniversaryYears').innerText = yearsToAnniversary + " Years";
    }

    updateBirthdayCountdown();
    updateAnniversaryCountdown();

    setInterval(function() {
        updateBirthdayCountdown();
        updateAnniversaryCountdown();
    }, 60000);
});