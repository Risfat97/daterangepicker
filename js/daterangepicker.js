class DateRangePicker {
    static currentDate = new Date();
    static #month = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];
    static #fullnameMonth = [
        'JANVIER', 
        'FÉVRIER', 
        'MARS', 
        'AVRIL', 
        'MAI', 
        'JUIN', 
        'JUILLET', 
        'AOÛT', 
        'SEPTEMPBRE', 
        'OCTOBRE', 
        'NOVEMBRE', 
        'DÉCEMBRE'
    ];
    static #handleClickTarget(target, calendarDOM) {
        const posTarget = target.getBoundingClientRect();
        calendarDOM.setAttribute('class', 'cal-container');
        calendarDOM.style.left = `${posTarget.x}px`;
        calendarDOM.style.top = `${posTarget.y + posTarget.height}px`;
    }

    static #handleClickBtnNav(instance, date, calendar, direction) {
        const calMonth = calendar.querySelector('.cal-month');
        const calYear = calendar.querySelector('.cal-year');
        if(direction == 'prev'){
            date.setMonth(date.getMonth() - 1);
        } else if(direction == 'next') {
            date.setMonth(date.getMonth() + 1);
        }
        calMonth.textContent = DateRangePicker.#month[date.getMonth()];
        calMonth.dataset.month = date.getMonth();

        calYear.textContent = date.getFullYear();
        calYear.dataset.month = date.getFullYear();
        DateRangePicker.#generateBodyTable(instance, calendar.querySelector('.cal-body-table'), date.getFullYear(), date.getMonth());
    }

    static #handleClickBtnSelectYear(inputYear, instance, tableContainer, yearSpan) {
        if(/[0-9]{4,5}/.test(inputYear.value)) {
            yearSpan.textContent = inputYear.value;
            instance.date = new Date(+inputYear.value, instance.date.getMonth(), instance.date.getDate());
            const monthSpan = tableContainer.parentElement.querySelector('.cal-month');
            DateRangePicker.#generateMonthSelector(instance, tableContainer, monthSpan);
        } else {
            alert("Veuillez entrer une année correcte");
        }
    }

    static #handleQuickSelectClick(instance, tableContainer) {
        tableContainer.innerHTML = `
            <div class="cal-input-container">
                <input class="cal-year-input" name="year-input" type="number" min="1900" max="2099" step="1" placeholder="Saisir une année"/>
                <button type="button" class="cal-btn-select-year">Choisir</button>
            </div>
        `;
        const btnSelectYear = tableContainer.querySelector('button.cal-btn-select-year');
        const inputYear = tableContainer.querySelector('input.cal-year-input');
        const yearSpan = tableContainer.parentElement.querySelector('.cal-year');
        const btnNavContainer = tableContainer.parentElement.querySelector('.cal-nav-container');
        btnSelectYear.onclick = (e) => {
            DateRangePicker.#handleClickBtnSelectYear(inputYear, instance, tableContainer, yearSpan);
        };
        btnNavContainer.classList.add('cal-hide');
        const yearSelector = DateRangePicker.#generateYearSelector(instance, tableContainer, yearSpan);
        tableContainer.appendChild(yearSelector);
    }

    static #handleClickDate(instance, tableContainer, target) {
        console.log(target.dataset.date);
    }

    static #generateYearSelector(instance, tableContainer, yearSpan) {
        const tableElem = document.createElement('table');
        const tbody = document.createElement('tbody');

        tableElem.setAttribute('class', 'cal-table');
        tbody.setAttribute('class', 'cal-body-table');
        let tr;
        const currentYear = DateRangePicker.currentDate.getFullYear();
        let j = 0;
        for(let i = currentYear-15; i<= currentYear+9; i++){
            if(j % 5 === 0){
                tr = document.createElement('tr');
                tr.setAttribute('class', 'cal-row-table');
                tbody.appendChild(tr);
            }
            const td = document.createElement('td');
            td.setAttribute('class', 'cal-year-td');
            if(i === currentYear)
                td.classList.add('cal-current-year');
            td.textContent = i;
            td.dataset.year = i;
            tr.appendChild(td);
            j++;
        }
        tbody.onclick = (e) => {
            const target = e.target;
            if(target.nodeName.toLowerCase() === 'td'){
                yearSpan.textContent = target.dataset.year;
                instance.date = new Date(+target.dataset.year, instance.date.getMonth(), instance.date.getDate());
                const monthSpan = tableContainer.parentElement.querySelector('.cal-month');
                DateRangePicker.#generateMonthSelector(instance, tableContainer, monthSpan);
            }
        };
        tableElem.appendChild(tbody);
        return tableElem;
    }

    static #generateMonthSelector(instance, tableContainer, monthSpan) {
        tableContainer.innerHTML = '';
        const tableElem = document.createElement('table');
        const tbody = document.createElement('tbody');

        tableElem.setAttribute('class', 'cal-table');
        tbody.setAttribute('class', 'cal-body-table');
        let tr;
        const currentMonth = DateRangePicker.currentDate.getMonth();
        let j = 0;
        for(let i = 0; i < DateRangePicker.#fullnameMonth.length; i++){
            if(i % 3 === 0){
                tr = document.createElement('tr');
                tr.setAttribute('class', 'cal-row-table');
                tbody.appendChild(tr);
            }
            const td = document.createElement('td');
            td.setAttribute('class', 'cal-month-td');
            if(i === currentMonth)
                td.classList.add('cal-current-month');
            td.textContent = DateRangePicker.#fullnameMonth[i];
            td.dataset.month = i;
            tr.appendChild(td);
        }
        tbody.onclick = (e) => {
            const target = e.target;
            if(target.nodeName.toLowerCase() === 'td'){
                monthSpan.textContent = DateRangePicker.#month[+target.dataset.month];
                instance.date = new Date(instance.date.getFullYear(), +target.dataset.month, instance.date.getDate());
                tableContainer.innerHTML = '';
                const newTable = DateRangePicker.#generateTable(instance, instance.date.getFullYear(), instance.date.getMonth())
                tableContainer.appendChild(newTable);
                const btnNavContainer = tableContainer.parentElement.querySelector('.cal-nav-container');
                btnNavContainer.classList.remove('cal-hide');
            }
        };
        tableElem.appendChild(tbody);
        tableContainer.appendChild(tableElem);
    }

    static #generateTable(instance, year, month) {
        const tableElem = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        tableElem.setAttribute('class', 'cal-table');
        thead.setAttribute('class', 'cal-head-table');
        tbody.setAttribute('class', 'cal-body-table');

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

        DateRangePicker.#generateBodyTable(instance, tbody, year, month);
        tableElem.appendChild(thead);
        tableElem.appendChild(tbody);
        return tableElem;
    }

    static #generateBodyTable(instance, tbody, year, month) {
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
            td.dataset.date = `${year}/${month+1 > 9 ? month+1 : '0'+(month+1)}/${i+1 > 9 ? i+1 : '0'+(i+1)}`;
            tr.appendChild(td);
        }

        tbody.onclick = (e) => {
            const target = e.target;
            if(target.nodeName.toLowerCase() === 'td'){
                DateRangePicker.#handleClickDate(instance, tbody.parentElement.parentElement, target);
            }
        };
    }

    constructor(selector) {
        this.target = document.querySelector(selector);
        this.dateSelected = new Date(DateRangePicker.currentDate.getFullYear(), DateRangePicker.currentDate.getMonth(), 1);
        this.calendar = this.#init();
        this.target?.addEventListener('click', (e) => {
            DateRangePicker.#handleClickTarget(this.target, this.calendar);
        });
        this.startSelected = null;
        this.endSelected = null;
    }

    get date() {
        return this.dateSelected;
    }

    set date(newDate) {
        try {
            this.dateSelected = new Date(newDate);
        } catch (error) {
            console.error("Date invalide");
            alert("Date invalide.")
        }
    }

    get start() {
        return this.startSelected;
    }

    set start(value) {
        try {
            this.start = new Date(value);
        } catch (error) {
            console.error("Date invalide");
            alert("Date invalide.")
        }
    }

    get end() {
        return this.endSelected;
    }

    set end(value) {
        try {
            this.endSelected = new Date(value);
        } catch (error) {
            console.error("Date invalide");
            alert("Date invalide.")
        }
    }

    getRange() {
        return {
            start: this.startSelected,
            end: this.endSelected
        };
    }

    #init() {
        const calContainer = document.createElement('div');
        const calHeader = document.createElement('div');
        const calSelectContainer = document.createElement('div');
        const calNavContainer = document.createElement('div');
        const btnNavPrev = document.createElement('button');
        const btnNavNext = document.createElement('button');
        const tableContainer = document.createElement('div');
        const table = DateRangePicker.#generateTable(this, this.dateSelected.getFullYear(), this.dateSelected.getMonth());
        

        calContainer.setAttribute('class', 'cal-container cal-hide');
        calHeader.setAttribute('class', 'cal-row cal-header');
        calSelectContainer.setAttribute('class', 'cal-select-container');
        calNavContainer.setAttribute('class', 'cal-nav-container');
        btnNavPrev.setAttribute('class', 'cal-nav nav-prev');
        btnNavNext.setAttribute('class', 'cal-nav nav-next');
        tableContainer.setAttribute('class', 'cal-table-container');
        

        calSelectContainer.innerHTML = `
            <span class="cal-month" data-month="${this.dateSelected.getMonth()}">${DateRangePicker.#month[this.dateSelected.getMonth()]}</span>&nbsp;&nbsp;
            <span class="cal-year" data-year="${this.dateSelected.getFullYear()}">${this.dateSelected.getFullYear()}</span>
            <hr/>
        `;
        calSelectContainer.onclick = (e) => {
            DateRangePicker.#handleQuickSelectClick(this, tableContainer);
        }

        btnNavPrev.textContent = '‹';
        btnNavPrev.onclick = (e) => {
            DateRangePicker.#handleClickBtnNav (this, this.dateSelected, this.calendar, 'prev');
        };
        btnNavNext.textContent = '›';
        btnNavNext.onclick = (e) => {
            DateRangePicker.#handleClickBtnNav(this, this.dateSelected, this.calendar, 'next');
        };
        calNavContainer.appendChild(btnNavPrev);
        calNavContainer.appendChild(btnNavNext);
        calHeader.appendChild(calSelectContainer);
        calHeader.appendChild(calNavContainer);

        calContainer.appendChild(calHeader);
        tableContainer.appendChild(table);
        calContainer.appendChild(tableContainer);
        document.body.appendChild(calContainer);
        return calContainer;
    }
}