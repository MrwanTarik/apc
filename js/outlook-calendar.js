// Get current date
const currentDate = new Date();
        
// Configuration with dynamic date
const CONFIG = {
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    emailData: {
        "2024-06-08": ["Email from John: Shareholder Meeting", "Reminder: Tax Filing Due"],
        "2024-06-10": ["HR Notice: Policy Updates", "Marketing Report"],
        "2024-06-25": ["Invitation: Annual General Meeting", "Newsletter: Company Updates"]
    }
};

class Calendar {
    constructor(containerId, config) {
        this.container = document.getElementById(containerId);
        this.config = config;
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.init();
    }

    init() {
        this.updateMonthHeader();
        this.renderWeekdays();
        this.renderDays();
    }

    updateMonthHeader() {
        const monthHeader = document.querySelector('.month-header');
        const monthName = this.monthNames[this.config.month - 1];
        monthHeader.textContent = `${monthName} ${this.config.year}`;
    }

    generateCalendarData() {
        let calendarData = [];
        
        // First week: Start with 31, then 1-6
        let firstWeek = ['31', '1', '2', '3', '4', '5', '6'];
        calendarData.push(firstWeek);
        
        // Second week: 7-13
        let secondWeek = ['7', '8', '9', '10', '11', '12', '13'];
        calendarData.push(secondWeek);
        
        // Third week: 14-20
        let thirdWeek = ['14', '15', '16', '17', '18', '19', '20'];
        calendarData.push(thirdWeek);
        
        // Fourth week: 21-27
        let fourthWeek = ['21', '22', '23', '24', '25', '26', '27'];
        calendarData.push(fourthWeek);
        
        // Fifth week: 28-30, then 1-4
        let fifthWeek = ['28', '29', '30', '1', '2', '3', '4'];
        calendarData.push(fifthWeek);
        
        return calendarData;
    }

    renderWeekdays() {
        this.config.weekdays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('weekday');
            dayHeader.textContent = day;
            this.container.appendChild(dayHeader);
        });
    }

    renderDays() {
        const calendarData = this.generateCalendarData();
        calendarData.forEach((week, weekIndex) => {
            week.forEach((day, dayIndex) => {
                this.renderDay(day, weekIndex, dayIndex);
            });
        });
    }

    renderDay(day, weekIndex, dayIndex) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        
        // Add span for the number
        const daySpan = document.createElement('span');
        daySpan.textContent = day;
        dayElement.appendChild(daySpan);

        // Add tooltip for days with events (specifically day 8)
        const dayNum = parseInt(day);
        if (dayNum === 8 && !dayElement.classList.contains('inactive') && !dayElement.classList.contains('next-month')) {
            // Create tooltip container
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            
            // Add icon and content container
            const tooltipContent = `
                <div class="d-flex align-items-center gap-3">
                    <img src="../images/icons/event-icon.svg" alt="notification">
                    <div>
                        <h3>Importance of time event</h3>
                        <p>Sunday 8 June 2024</p>
                        <p>10:30 pm</p>
                    </div>
                </div>
            `;
            
            tooltip.innerHTML = tooltipContent;
            dayElement.appendChild(tooltip);
        }

        this.addDayClasses(dayElement, day, weekIndex, dayIndex);
        this.addDayEventHandler(dayElement, day, weekIndex);

        this.container.appendChild(dayElement);
    }

    addDayClasses(element, day, weekIndex, dayIndex) {
        const dayNum = parseInt(day);
        
        // Previous month day (only 31)
        if (weekIndex === 0 && dayNum === 31) {
            element.classList.add('inactive');
        }
        // Next month days (1-4 in last week)
        else if (weekIndex === 4 && dayNum <= 4) {
            element.classList.add('next-month');
        }
        // Weekend days
        else if (dayIndex === 5 || dayIndex === 6) {
            element.classList.add('weekend');
        }
        // Current day (day 21)
        if (dayNum === 21 && !element.classList.contains('inactive') && !element.classList.contains('next-month')) {
            element.classList.add('current-day');
        }
        // Add has-events class for days with events (like day 8)
        if (dayNum === 8 && !element.classList.contains('inactive') && !element.classList.contains('next-month')) {
            element.classList.add('has-events');
        }
    }

    addDayEventHandler(element, day, weekIndex) {
        if (!element.classList.contains('inactive') && 
            !element.classList.contains('next-month')) {
            const dateStr = `${this.config.year}-${String(this.config.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            if (this.config.emailData[dateStr]) {
                element.classList.add('has-events');
            }

           
        }
    }

    handleDayClick(element, dateStr) {
        document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
        element.classList.add('selected');

        document.getElementById('selectedDate').textContent = dateStr;
        const emails = this.config.emailData[dateStr] || ['No emails found.'];

        const emailList = document.getElementById('emailList');
        emailList.innerHTML = '';
        emails.forEach(email => {
            const li = document.createElement('li');
            li.textContent = email;
            emailList.appendChild(li);
        });
    }
}

// Initialize calendar
new Calendar('calendar', CONFIG);