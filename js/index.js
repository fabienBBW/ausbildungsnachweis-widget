import { Day } from "./classes/day.js";

// AJAX fetch the days for the current calendar week
// (if any).
async function getDaysForCW(cw) {
    const days = await Day.fromCW(cw);
}

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

// generateDateRangeGetStartDate: generate the workdays 
// range for a given calendar week.
// return the start date of the work week as a Date object.
function generateDateRangeGetStartDate(calendarWeek, year) {
    // Calculate the beginning of the given calendar week.
    const lastDay = (calendarWeek - 1) * 7;
    // Calculate the number of milliseconds from the beginning of the year
    // (e.g. 01-01-2026) to the start of the calendar week.
    const millisecondsElapsedSinceYearBegan = lastDay * 24 * 60 * 60 * 1000;
    // Calculate the number of milliseconds 
    // from the EPOCH to the beginning
    // of the first calendar week of the
    // given year.
    const millisecondsNewYear = new Date(`${year}`);
    const day = millisecondsNewYear.getDay();
    // Set the time to be the Monday of the first week of the year,
    // since this is the start of the first calendar week.
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

    // dateRet is the start date.
    return dateRet;
}

// generateDateRange: generate the workdays 
// range for a given calendar week.
function generateDateRange(calendarWeek, year) {
    // Calculate the beginning of the given calendar week.
    const lastDay = (calendarWeek - 1) * 7;
    // Calculate the number of milliseconds from the beginning of the year
    // (e.g. 01-01-2026) to the start of the calendar week.
    const millisecondsElapsedSinceYearBegan = lastDay * 24 * 60 * 60 * 1000;
    // Calculate the number of milliseconds 
    // from the EPOCH to the beginning
    // of the first calendar week of the
    // given year.
    const millisecondsNewYear = new Date(`${year}`);
    const day = millisecondsNewYear.getDay();
    // Set the time to be the Monday of the first week of the year,
    // since this is the start of the first calendar week.
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

function getCWForTimestamp(currentTime) {
    const newYearDate = new Date(`${currentTime.getFullYear()}`);
    let isDay = newYearDate.getDay();
    console.log(`${isDay}: ${currentTime.getDay()}`)
    if(isDay != currentTime.getDay()) {
        while(isDay != currentTime.getDay()) {
            if(isDay > currentTime.getDay()) {
                newYearDate.setHours(newYearDate.getHours() - 23);
                isDay = newYearDate.getDay();
            } else {
                newYearDate.setHours(newYearDate.getHours() + 23);
                isDay = newYearDate.getDay();
            }
            console.log(`${isDay}: ${currentTime.getDay()}`)
        }
    }
    let newYearCurrentDate = `${newYearDate.getFullYear()}-${newYearDate.getMonth()}-${newYearDate.getDate()}`;
    let timestampDate = `${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}`;
    let cw = 1;
    // current day is Sunday 
    // (e.g. one day before the first 
    // calendar week of the year).
    if(isDay == 0) {
        cw = 0;
    }
    console.log(`${newYearCurrentDate}: ${timestampDate}`);
    while(newYearCurrentDate != timestampDate) {
        newYearDate.setDate(newYearDate.getDate() + 7)
        cw += 1;
        newYearCurrentDate = `${newYearDate.getFullYear()}-${newYearDate.getMonth()}-${newYearDate.getDate()}`;
        console.log(`${newYearCurrentDate}: ${timestampDate}`);
    }
    return cw;
}

// setKWFromQuery: set the current Kalenderwoche 
// based on the value in the query string.
function setKWFromQuery() {
    // get the value in the query.
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const kw = searchParams.get("kw");
    if(kw == null) {
        return null;
    }
    document.querySelector("#badge-kw").innerText = `KW ${kw}`;
    document.querySelector("#daterange-current").innerText = generateDateRange(Number(kw), "2026");
    return kw;
}

// setSelectKWs: setup the previous and next Kalenderwoche 
// date ranges (for the user to select them if needed).
// - kw_int: kalenderwoche integer
function setSelectKWs(kw_int) {
    let kw_previous = kw_int - 1;
    document.querySelector("#badge-kw-previous").innerText = `KW ${kw_previous}`;
    document.querySelector("#daterange-previous").innerText = generateDateRange(kw_previous, "2026");
    let kw_next = kw_int + 1;
    document.querySelector("#badge-kw-next").innerText = `KW ${kw_next}`;
    document.querySelector("#daterange-next").innerText = generateDateRange(kw_next, "2026");
}

// toggleSelectKWs: close / open the selection menu
// for selecting different kalenderwochen.
function toggleSelectKWs() {
    document.querySelector("#dateranges-select").classList.toggle("hidden");
    if(document.querySelector("#dateranges-select").classList.contains("hidden")) {
        document.querySelector("#dropdown-icon").classList = "fa-solid fa-arrow-down";
    } else {
        document.querySelector("#dropdown-icon").classList = "fa-solid fa-arrow-up";
    }
}

function setCurrentDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const dateStr = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    document.querySelector("#current-day-text").innerText = `${dateStr}`
}

function generateChoiceDays(CW) {
    const startDate = generateDateRangeGetStartDate(CW, "2026");
    let daysGen = [];
    for(let i = startDate.getDate(); i != (startDate.getDate() + 5); i++) {
        const currentDate = new Date(startDate.getTime());
        currentDate.setDate(i);
        daysGen.push(`
            <a href="index.html?kw=${CW}&day=${Math.floor(currentDate.getTime() / 1000)}">
                ${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}
            </a>
        `);
    }
    return daysGen;
}

function insertChoiceDays(daysGen) {
    const elem = document.querySelector("#choose-days");
    daysGen.map((day) => elem.insertAdjacentHTML("beforeend", day));
}

function toggleDisplayChoiceDays() {
    document.querySelector("#choose-days").classList.toggle("hide-choose-days");
}

function setup() {
    // Set default calendar week if not set.
    const searchParams = new URLSearchParams(window.location.search);
    if(!(searchParams.has("kw"))) {
        const date = new Date();
        const cw = getCWForTimestamp(date);
        searchParams.append("kw", cw.toString());
        window.location.search = searchParams.toString();
    }
    const kw = setKWFromQuery();
    if(kw != null) {
        setSelectKWs(Number(kw));
    }

    // Set day to current day if not set.
    if(!(searchParams.has("day"))) {
        const timestamp = Date.now();
        const timestampSeconds = Math.floor(timestamp / 1000);
        searchParams.append("day", timestampSeconds.toString());
        window.location.search = searchParams.toString();
    }
    // Set day in the UI based on params.
    const day = searchParams.get("day");
    if(day != null) {
        setCurrentDay(day);
    }

    // Generate the links to get to other 
    // days in the current week.
    const choiceDays = generateChoiceDays(Number(kw));
    console.log(choiceDays);
    insertChoiceDays(choiceDays);

    // Setup Markdown editor (easyMDE)
    const easyMDE = new EasyMDE({element: document.querySelector("#activities-edit")});

    // Get the saved days (if any).
    getDaysForCW(kw);
}

setup();

function test() {
    let date = new Date("2026-03-18");
    const cw = getCWForTimestamp(date);
    console.log(cw);

    let date2 = new Date("2026-04-10");
    const cw2 = getCWForTimestamp(date2);
    console.log(cw2);
}