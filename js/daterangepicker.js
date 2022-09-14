class DateRangePicker {
    static _handleClickTarget(target, calendarDOM) {
        const posTarget = target.getBoundingClientRect();
        calendarDOM.setAttribute('class', 'cal-container');
        calendarDOM.style.left = `${posTarget.x}px`;
        calendarDOM.style.top = `${posTarget.y + posTarget.height}px`;
    }

    constructor(selector) {
        this.target = document.querySelector(selector);
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

        calSelectContainer.innerHTML = `
            <span class="month">SEPT.</span>
            <span class="year">2022</span>
            <hr>
        `;
        btnNavPrev.textContent = '‹';
        btnNavNext.textContent = '›';
        calNavContainer.appendChild(btnNavPrev);
        calNavContainer.appendChild(btnNavNext);
        calHeader.appendChild(calSelectContainer);
        calHeader.appendChild(calNavContainer);

        thead.innerHTML = `
            <tr>
                <th>L</th>
                <th>M</th>
                <th>M</th>
                <th>J</th>
                <th>V</th>
                <th>S</th>
                <th>D</th>
            </tr>
        `;
        let tr;
        for(let i = 0; i < 30; i++) {
            if(i % 7 === 0){
                tr = document.createElement('tr');
                tbody.appendChild(tr);
            }
            const td = document.createElement('td');
            td.textContent = `${i+1}`;
            tr.appendChild(td);
        }
        tableElem.appendChild(thead);
        tableElem.appendChild(tbody);

        calContainer.appendChild(calHeader);
        calContainer.appendChild(tableElem);
        document.body.appendChild(calContainer);
        return calContainer;
    }
}