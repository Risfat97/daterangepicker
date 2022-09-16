class DateRangePicker {
    static currentDate = new Date();
    static month = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];
    static _handleClickTarget(target, calendarDOM) {
        const posTarget = target.getBoundingClientRect();
        calendarDOM.setAttribute('class', 'cal-container');
        calendarDOM.style.left = `${posTarget.x}px`;
        calendarDOM.style.top = `${posTarget.y + posTarget.height}px`;
    }

    static _handleClickBtnNav(date, calendar, direction) {
        const calMonth = calendar.querySelector('.cal-month');
        const calYear = calendar.querySelector('.cal-year');
        if(direction == 'prev'){
            date.setMonth(date.getMonth() - 1);
        } else if(direction == 'next') {
            date.setMonth(date.getMonth() + 1);
        }
        calMonth.textContent = DateRangePicker.month[date.getMonth()];
        calMonth.dataset.month = date.getMonth();

        calYear.textContent = date.getFullYear();
        calYear.dataset.month = date.getFullYear();
        DateRangePicker._generateBodyTable(calendar.querySelector('.cal-body-table'), date.getFullYear(), date.getMonth());
    }

    static _generateBodyTable(tbody, year, month) {
        tbody.innerHTML = '';
        const nbDayThisMonth = (new Date(year, month+1, 0)).getDate();
        let firstDayMonth = (new Date(year, month, 1)).getDay() - 1;
        firstDayMonth = (firstDayMonth < 0) ? 7 + firstDayMonth : firstDayMonth;
        let aux = 0;
        const daysBeforeFirstDayMonth = [];
        while(aux !== firstDayMonth) {
            const td = document.createElement('td');
            daysBeforeFirstDayMonth.push(td);
            aux++;
        }
        let tr = document.createElement('tr');
        tr.setAttribute('class', 'cal-row-table');
        daysBeforeFirstDayMonth.forEach(td => tr.appendChild(td));
        tbody.appendChild(tr);

        for(let i = 0; i < nbDayThisMonth; i++) {
            if((aux+i) % 7 === 0){
                tr = document.createElement('tr');
                tr.setAttribute('class', 'cal-row-table');
                tbody.appendChild(tr);
            }
            const td = document.createElement('td');
            if(i+1 === DateRangePicker.currentDate.getDate() && 
                    DateRangePicker.currentDate.getMonth() === month && 
                    DateRangePicker.currentDate.getFullYear() === year)
                td.setAttribute('class', 'cal-current-date');
            td.textContent = `${i+1}`;
            tr.appendChild(td);
        }
    }

    constructor(selector) {
        this.target = document.querySelector(selector);
        this.date = new Date(DateRangePicker.currentDate.getFullYear(), DateRangePicker.currentDate.getMonth(), 1);
        this.calendar = this._init();
        this.target?.addEventListener('click', (e) => {
            DateRangePicker._handleClickTarget(this.target, this.calendar);
        });
    }

    _init() {
        const calContainer = document.createElement('div');
        const calHeader = document.createElement('div');
        const calSelectContainer = document.createElement('div');
        const calNavContainer = document.createElement('div');
        const btnNavPrev = document.createElement('button');
        const btnNavNext = document.createElement('button');
        const tableElem = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        calContainer.setAttribute('class', 'cal-container cal-hide');
        calHeader.setAttribute('class', 'cal-row cal-header');
        calSelectContainer.setAttribute('class', 'cal-select-container');
        calNavContainer.setAttribute('class', 'cal-nav-container');
        btnNavPrev.setAttribute('class', 'cal-nav nav-prev');
        btnNavNext.setAttribute('class', 'cal-nav nav-next');
        tableElem.setAttribute('class', 'cal-table');
        thead.setAttribute('class', 'cal-head-table');
        tbody.setAttribute('class', 'cal-body-table');

        calSelectContainer.innerHTML = `
            <span class="cal-month" data-month="${this.date.getMonth()}">${DateRangePicker.month[this.date.getMonth()]}</span>
            <span class="cal-year" data-year="${this.date.getFullYear()}">${this.date.getFullYear()}</span>
            <hr>
        `;
        btnNavPrev.textContent = '‹';
        btnNavPrev.onclick = (e) => {
            DateRangePicker._handleClickBtnNav(this.date, this.calendar, 'prev');
        };
        btnNavNext.textContent = '›';
        btnNavNext.onclick = (e) => {
            DateRangePicker._handleClickBtnNav(this.date, this.calendar, 'next');
        };
        calNavContainer.appendChild(btnNavPrev);
        calNavContainer.appendChild(btnNavNext);
        calHeader.appendChild(calSelectContainer);
        calHeader.appendChild(calNavContainer);

        thead.innerHTML = `
            <tr class="cal-row-table">
                <th>L</th>
                <th>M</th>
                <th>M</th>
                <th>J</th>
                <th>V</th>
                <th>S</th>
                <th>D</th>
            </tr>
        `;

        DateRangePicker._generateBodyTable(tbody, this.date.getFullYear(), this.date.getMonth());
        tableElem.appendChild(thead);
        tableElem.appendChild(tbody);

        calContainer.appendChild(calHeader);
        calContainer.appendChild(tableElem);
        document.body.appendChild(calContainer);
        return calContainer;
    }
}