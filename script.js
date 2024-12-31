document.addEventListener("DOMContentLoaded", function() {
    const currentDate = new Date();

    // กำหนดวันเกิดและวันครบรอบ
    const birthDate = new Date('2006-12-23T00:00:00'); // วันเกิด (23 ธันวาคม 2006)
    const anniversaryDate = new Date('2022-11-19T00:00:00'); // วันครบรอบ (19 พฤศจิกายน 2021)

    // คำนวณอายุ
    function calculateAge(birthDate, currentDate) {
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const m = currentDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // ฟังก์ชั่นคำนวณเวลาที่เหลือ (วัน เดือน ชั่วโมง นาที)
    function formatTime(ms) {
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30); // ประมาณจำนวนเดือน
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

        return `${days} Days, ${months} Months, ${hours} Hours, ${minutes} Minutes`;
    }

    // ฟังก์ชั่นในการอัพเดต countdown ของวันเกิด
    function updateBirthdayCountdown() {
        // ตรวจสอบว่าเวลาผ่านไปแล้วหรือยัง
        const nextBirthday = new Date(birthDate);
        if (nextBirthday <= currentDate) {
            nextBirthday.setFullYear(currentDate.getFullYear() + 1); // หากวันเกิดปีนี้ผ่านไปแล้ว ให้ตั้งปีหน้า
        }

        const birthdayDifference = nextBirthday - currentDate;

        const birthdayTime = formatTime(birthdayDifference);
        document.getElementById('birthdayCountdown').innerText = birthdayTime;

        const age = calculateAge(birthDate, currentDate); // คำนวณอายุ
        document.getElementById('age').innerText = age; // แสดงอายุปัจจุบัน
    }

    // ฟังก์ชั่นในการอัพเดต countdown ของปีครบรอบ
    function updateAnniversaryCountdown() {
        // ตรวจสอบว่าเวลาผ่านไปแล้วหรือยัง
        const nextAnniversary = new Date(anniversaryDate);
        if (nextAnniversary <= currentDate) {
            nextAnniversary.setFullYear(currentDate.getFullYear() + 1); // หากวันครบรอบปีนี้ผ่านไปแล้ว ให้ตั้งปีหน้า
        }

        const anniversaryDifference = nextAnniversary - currentDate;

        const anniversaryTime = formatTime(anniversaryDifference);
        document.getElementById('anniversaryCountdown').innerText = anniversaryTime;

        const yearsToAnniversary = Math.floor((nextAnniversary - anniversaryDate) / (1000 * 60 * 60 * 24 * 365.25));
        document.getElementById('anniversaryYears').innerText = yearsToAnniversary + " Years"; // แสดงจำนวนปีครบรอบ
    }

    // อัพเดต countdown ทั้งหมด
    updateBirthdayCountdown();
    updateAnniversaryCountdown();

    // อัพเดตทุกๆ 1 นาที
    setInterval(function() {
        updateBirthdayCountdown();
        updateAnniversaryCountdown();
    }, 60000); // อัพเดตทุกๆ 60 วินาที
});
