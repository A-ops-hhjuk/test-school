document.addEventListener("DOMContentLoaded", () => {

    /* ================= CALENDAR ================= */
    const monthDisplay = document.getElementById('monthDisplay');
    const daysContainer = document.getElementById('daysContainer');
    const selectMonth = document.getElementById('selectMonth');
    const selectYear = document.getElementById('selectYear');
    const selectedFullDate = document.getElementById('selectedFullDate');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');

    if (
        monthDisplay &&
        daysContainer &&
        selectMonth &&
        selectYear &&
        selectedFullDate &&
        prevMonth &&
        nextMonth
    ) {

        let currentBtnDate = new Date();
        const monthsAr = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

        function initSelectors() {
            selectMonth.innerHTML = "";
            selectYear.innerHTML = "";

            monthsAr.forEach((m, i) => {
                selectMonth.innerHTML += `<option value="${i}">${m}</option>`;
            });

            const currentYear = new Date().getFullYear();
            for (let i = currentYear - 50; i <= currentYear + 50; i++) {
                selectYear.innerHTML += `<option value="${i}">${i}</option>`;
            }
        }

        function renderCalendar() {
            daysContainer.innerHTML = "";

            const year = currentBtnDate.getFullYear();
            const month = currentBtnDate.getMonth();

            monthDisplay.innerText = `${monthsAr[month]} ${year}`;
            selectMonth.value = month;
            selectYear.value = year;

            const firstDayIndex = new Date(year, month, 1).getDay();
            const lastDay = new Date(year, month + 1, 0).getDate();

            for (let x = firstDayIndex; x > 0; x--) {
                daysContainer.innerHTML += `<div class="empty"></div>`;
            }

            for (let i = 1; i <= lastDay; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.innerText = i;

                if (
                    i === new Date().getDate() &&
                    month === new Date().getMonth() &&
                    year === new Date().getFullYear()
                ) {
                    dayDiv.classList.add('today');
                }

                dayDiv.onclick = () => {
                    document.querySelectorAll('.days-grid div').forEach(d => d.classList.remove('selected'));
                    dayDiv.classList.add('selected');
                    selectedFullDate.innerText = `${year}/${month + 1}/${i}`;
                };

                daysContainer.appendChild(dayDiv);
            }
        }

        selectMonth.onchange = () => {
            currentBtnDate.setMonth(selectMonth.value);
            renderCalendar();
        };

        selectYear.onchange = () => {
            currentBtnDate.setFullYear(selectYear.value);
            renderCalendar();
        };

        prevMonth.onclick = () => {
            currentBtnDate.setMonth(currentBtnDate.getMonth() - 1);
            renderCalendar();
        };

        nextMonth.onclick = () => {
            currentBtnDate.setMonth(currentBtnDate.getMonth() + 1);
            renderCalendar();
        };

        initSelectors();
        renderCalendar();
    }

    /* ================= NAVBAR ================= */
    const navbar = document.getElementById("mainNavbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle(
                "navbar-scrolled",
                window.scrollY > 80 && window.innerWidth > 800
            );
        });
    }

    /* ================= REVEAL ================= */
    const elements = document.querySelectorAll(".reveal, .reveal-right, .reveal-zoom");
    if (elements.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(el => observer.observe(el));
    }

    /* ================= FADE CARDS ================= */
    const cards = document.querySelectorAll('.fade-card');
    if (cards.length) {
        cards.forEach((card, index) => {
            setTimeout(() => card.classList.add('show'), index * 120);
        });
    }

});