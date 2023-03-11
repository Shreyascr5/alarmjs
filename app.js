let getMenu = document.querySelectorAll("select");
let currentTime = document.querySelector("h1");
let setbtn = document.querySelector("button");
let content = document.querySelector(".content");
let time;
let alarmTime;
let isAlarm = false;
let alarmSound = new Audio("/ringtone.mp3");
// console.log(getMenu);
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = ` <option value="${i}">
    ${i}
</option>`;
    getMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}"> ${i} </option>`;
    getMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}"> ${ampm} </option>`;
    getMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? h = "0" + h : h;
    m = m < 10 ? m = "0" + m : m;
    s = s < 10 ? s = "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
    if (alarmTime == `${h}:${m} ${ampm}`) {
        // console.log("alarm ringing");
        alarmSound.play();
        alarmSound.loop = true;
    }
}, 1000);


function setAlarm() {
    if (isAlarm) {
        alarmTime = "";
        alarmSound.pause();
        content.classList.remove("disable");
        setbtn.innerText = "Set Alarm";
        return isAlarm = false;

    }
    time = `${getMenu[0].value}:${getMenu[1].value} ${getMenu[2].value}`;

    console.log(time);


    if (time.includes("hour") || time.includes("min") || time.includes("ampm")) {
        return alert("Enter a valid time to set the alarm");
    }
    alarmTime = time;
    content.classList.add("disable");
    setbtn.innerHTML = "Clear Alarm";
    isAlarm = true;



}

setbtn.addEventListener("click", setAlarm);