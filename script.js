// ========================================
// ЖАБИР КЫЗДАР МЕДРЕСЕСИ
// ========================================


// Сабак убакыттары

const times = [
    "08:30 – 09:15",
    "09:20 – 10:05",
    "10:10 – 10:55",
    "11:10 – 11:45",
    "12:00 – 12:45",
    "13:45 – 14:30",
    "14:35 – 15:20",
    "15:25 – 16:10"
];


// ========================================
// ЖУМАЛЫК РАСПИСАНИЕ
// ========================================

const schedule = {

    "Дүйшөмбү": [
        ["Арап тили", "Жанылай устаза"],
        ["Фикх", "Жанылай устаза"],
        ["1-топ: Куран / 2-топ: Тажвид", "Толгонай / Феруза"],
        ["1-топ: Куран / 2-топ: Тажвид", "Толгонай / Феруза"],
        ["1-топ: Тажвид / 2-топ: Куран", "Феруза / Толгонай"],
        ["1-топ: Тажвид / 2-топ: Куран", "Феруза / Толгонай"],
        ["Кыздар бош", "—"],
        ["Кыздар бош", "—"]
    ],

    "Шейшемби": [
        ["Адеп-ахлак", "Лайли устаза"],
        ["Адеп-ахлак", "Лайли устаза"],
        ["1-топ: Тажвид / 2-топ: Куран", "Феруза / Толгонай"],
        ["1-топ: Тажвид / 2-топ: Куран", "Феруза / Толгонай"],
        ["1-топ: Куран / 2-топ: Тажвид", "Толгонай / Феруза"],
        ["1-топ: Куран / 2-топ: Тажвид", "Толгонай / Феруза"],
        ["Сарф", "Жасмина устаза"],
        ["Сарф", "Жасмина устаза"]
    ],

    "Шаршемби": [
        ["Арап тили", "Жанылай устаза"],
        ["Фикх", "Жанылай устаза"],
        ["1-топ: Куран / 2-топ: Тажвид", "Толгонай / Феруза"],
        ["1-топ: Куран / 2-топ: Тажвид", "Толгонай / Феруза"],
        ["1-топ: Тажвид / 2-топ: Куран", "Феруза / Толгонай"],
        ["1-топ: Тажвид / 2-топ: Куран", "Феруза / Толгонай"],
        ["Арап тили", "Жанылай устаза"],
        ["Фикх", "Жанылай устаза"]
    ],

    "Бейшемби": [
        ["Сарф", "Жасмина устаза"],
        ["Сарф", "Жасмина устаза"],
        ["Сиро", "Феруза устаза"],
        ["Сиро", "Феруза устаза"],
        ["Кыргызстан тарыхы", "Феруза устаза"],
        ["Кыргызстан тарыхы", "Феруза устаза"],
        ["Акыйда", "Абдумалик устаз"],
        ["Акыйда", "Абдумалик устаз"],
        ["Усул-ул-фыкх", "Абдумалик устаз"],
        ["Усул-ул-фыкх", "Абдумалик устаз"]
    ],

    "Жума": [
        ["Арап тили", "Жанылай устаза"],
        ["Фикх", "Жанылай устаза"],
        ["1-топ: Куран / 2-топ: Тажвид", "Толгонай / Феруза"],
        ["1-топ: Куран / 2-топ: Тажвид", "Толгонай / Феруза"],
        ["Хадис", "Назира устаза"],
        ["Хадис", "Назира устаза"]
    ],

    "Ишемби": [
        ["Адеп-ахлак", "Лайли устаза"],
        ["Адеп-ахлак", "Лайли устаза"],
        ["Хусну-л-хат", "Лайли устаза"],
        ["Хусну-л-хат", "Лайли устаза"],
        ["Информатика", "Зухра устаза"],
        ["Информатика", "Зухра устаза"]
    ]
};


// ========================================
// РАСПИСАНИЕНИ ЧЫГАРУУ
// ========================================

function renderSchedule() {

    const container =
        document.getElementById("scheduleContainer");

    container.innerHTML = "";

    Object.keys(schedule).forEach(day => {

        const dayBox =
            document.createElement("div");

        dayBox.className = "day";

        dayBox.innerHTML = `
            <div class="day-title">
                ${day}
            </div>
        `;

        schedule[day].forEach((lesson, index) => {

            const lessonBox =
                document.createElement("div");

            lessonBox.className = "lesson";

            const time =
                times[index] || "Убактысы көрсөтүлгөн эмес";

            lessonBox.innerHTML = `
                <div class="number">
                    ${index + 1}-сабак
                </div>

                <div class="lesson-time">
                    ${time}
                </div>

                <div>
                    ${lesson[0]}
                </div>

                <div class="lesson-teacher">
                    👩🏻‍🏫 ${lesson[1]}
                </div>
            `;

            dayBox.appendChild(lessonBox);

        });

        container.appendChild(dayBox);

    });
}

renderSchedule();


// ========================================
// БИЛДИРҮҮЛӨРДҮ САКТОО
// ========================================

let requests =
    JSON.parse(
        localStorage.getItem("jabirRequests")
    ) || [];


// ========================================
// САБАККА КЕЛЕ АЛБАЙМ
// ========================================

function sendRequest() {

    const teacher =
        document.getElementById("absentTeacher").value;

    const date =
        document.getElementById("replaceDate").value;

    const lesson =
        document.getElementById("replaceLesson").value;

    const reason =
        document.getElementById("reason").value.trim();


    if (!date || !lesson || !reason) {

        alert(
            "Сураныч, бардык талааларды толтуруңуз."
        );

        return;
    }


    const newRequest = {

        id: Date.now(),

        teacher: teacher,

        date: date,

        lesson: lesson,

        reason: reason,

        replacement: null
    };


    requests.push(newRequest);


    localStorage.setItem(
        "jabirRequests",
        JSON.stringify(requests)
    );


    alert(
        "Билдирүү бардык устазаларга жөнөтүлдү."
    );


    document.getElementById("replaceLesson").value = "";

    document.getElementById("reason").value = "";


    renderRequests();

    showPage("messages");
}


// ========================================
// БИЛДИРҮҮЛӨРДҮ КӨРСӨТҮҮ
// ========================================

function renderRequests() {

    const box =
        document.getElementById("requests");

    box.innerHTML = "";


    if (requests.length === 0) {

        box.innerHTML =
            "<p>Азырынча билдирүү жок.</p>";

        return;
    }


    requests.forEach(request => {

        const item =
            document.createElement("div");

        item.className = "request";


        let button = "";


        if (!request.replacement) {

            button = `
                <button
                    class="accept-btn"
                    onclick="acceptReplacement(${request.id})">
                    🙋 Мен өтөм
                </button>
            `;

        } else {

            button = `
                <p class="accepted">
                    ✅ Ордуна өткөн:
                    ${request.replacement}
                </p>
            `;
        }


        item.innerHTML = `

            <h3>🔔 Сабак алмаштыруу</h3>

            <p>
                <b>Келе албаган устаза:</b>
                ${request.teacher}
            </p>

            <p>
                <b>Күн:</b>
                ${request.date}
            </p>

            <p>
                <b>Сабак:</b>
                ${request.lesson}
            </p>

            <p>
                <b>Себеби:</b>
                ${request.reason}
            </p>

            ${button}

        `;


        box.appendChild(item);

    });
}

renderRequests();


// ========================================
// ОРДУНА БИР ГАНА УСТАЗА ӨТӨТ
// ========================================

function acceptReplacement(id) {

    const request =
        requests.find(item => item.id === id);


    if (!request) return;


    if (request.replacement) {

        alert(
            "Бул сабакка башка устаза мурунтан дайындалган."
        );

        return;
    }


    const name =
        prompt(
            "Өзүңүздүн аты-жөнүңүздү жазыңыз:"
        );


    if (!name) return;


    request.replacement = name;


    localStorage.setItem(
        "jabirRequests",
        JSON.stringify(requests)
    );


    alert(
        "Сиз бул сабакты өтүүгө дайындалдыңыз."
    );


    renderRequests();
}


// ========================================
// АЙЛЫК ОТЧЕТ
// ========================================

// Маанилүү:
// replacementCount айлыкка кошулбайт.

const teachers = [

    {
        name: "Жанылай устаза",
        subjects: "Арап тили, Фикх",
        lessons: 18,
        salary: "Негизги айлык"
    },

    {
        name: "Толгонай устаза",
        subjects: "Куран",
        lessons: 22,
        salary: "Негизги айлык"
    },

    {
        name: "Феруза устаза",
        subjects: "Тажвид, Сиро, Кыргызстан тарыхы",
        lessons: 20,
        salary: "Негизги айлык"
    },

    {
        name: "Лайли устаза",
        subjects: "Адеп-ахлак, Хусну-л-хат",
        lessons: 16,
        salary: "Негизги айлык"
    },

    {
        name: "Абдумалик устаз",
        subjects: "Акыйда, Усул-ул-фыкх",
        lessons: 20,
        salary: "Негизги айлык"
    },

    {
        name: "Назира устаза",
        subjects: "Хадис",
        lessons: 12,
        salary: "Негизги айлык"
    },

    {
        name: "Жасмина устаза",
        subjects: "Сарф",
        lessons: 18,
        salary: "Негизги айлык"
    },

    {
        name: "Зухра устаза",
        subjects: "Информатика",
        lessons: 12,
        salary: "Негизги айлык"
    },

    {
        name: "Зухра Вахидова",
        subjects: "Мүдүр",
        lessons: 0,
        salary: "Негизги айлык"
    }
];


// ========================================
// ОТЧЕТТИ ЧЫГАРУУ
// ========================================

function renderReport() {

    const table =
        document.getElementById("reportTable");

    table.innerHTML = "";


    teachers.forEach(teacher => {

        const replacementCount =
            requests.filter(
                request =>
                    request.replacement === teacher.name
            ).length;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <b>${teacher.name}</b>
            </td>

            <td>
                ${teacher.subjects}
            </td>

            <td>
                ${teacher.lessons}
            </td>

            <td>
                ${replacementCount}
            </td>

            <td>
                ${teacher.salary}
            </td>

        `;


        table.appendChild(row);

    });
}

renderReport();


// ========================================
// БӨЛҮМ АЧУУ
// ========================================

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    document
        .getElementById(pageId)
        .classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (pageId === "messages") {
        renderRequests();
    }


    if (pageId === "report") {
        renderReport();
    }
}