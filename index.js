// addNewEntry: add a new input for inputting activities 
// of the day.
function addNewEntry() {
    // The element where the extra inputs should 
    // be appended.
    const insertElement = document.querySelector("#activities-input-list");
    // The element which will be appended.
    const elementToInsert = `
        <div id="activities-input">
            <textarea rows="3" cols="20" placeholder="Aktivität"></textarea>
            <textarea rows="3" cols="20" placeholder="Zeitdauer"></textarea>
            <button type="button" onclick="addNewEntry()">+</button> 
        </div>
    `;
    // Append the element inside InsertElement.
    insertElement.insertAdjacentHTML("beforeend", elementToInsert)
}

// generateDateRange: generate the workdays 
// range for a given calendar week.
function generateDateRange(calendarWeek, year) {
    // Calculate the last day of the year
    // which is in this calendar week.
    const lastDay = (calendarWeek - 1) * 7;
    const millisecondsElapsedSinceYearBegan = lastDay * 24 * 60 * 60 * 1000;
    const millisecondsNewYear = new Date(`${year}`);
    const day = millisecondsNewYear.getDay();
    if(day != 1) {
        let isDay = millisecondsNewYear.getDay();
        while (isDay != 1) {
            millisecondsNewYear.setHours(millisecondsNewYear.getHours() - 24);
            isDay = millisecondsNewYear.getDay();
            //console.log(isDay);
        }
    }
    const millisecondsElapsed = millisecondsNewYear.getTime() + millisecondsElapsedSinceYearBegan;
    const dateRet = new Date(millisecondsElapsed);
    //console.log(dateRet.toString());

    const startDate = dateRet.getDate() + "." + (dateRet.getMonth() + 1) + "." + dateRet.getFullYear();
    const endDate = new Date(dateRet.getTime());
    endDate.setDate(dateRet.getDate() + 4);
    const endDateStr = endDate.getDate() + "." + (endDate.getMonth() + 1) + "." + endDate.getFullYear();
    return `${startDate} - ${endDateStr}`;
}

console.log(generateDateRange(32, "2026"));
console.log(generateDateRange(15, "2026"));