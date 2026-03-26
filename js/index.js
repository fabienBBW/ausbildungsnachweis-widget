import { Day } from "./classes/day.js";

// AJAX fetch the days for the current calendar week
// (if any).
async function getDaysForCW(cw) {
    const days = await Day.fromCW(cw);
}

// AJAX fetch the day for the current date
// (if any).
async function getDayForDateStr(currentDate) {
    let monthStr = (currentDate.getMonth() + 1).toString();
    if(monthStr.length == 1) {
        monthStr = "0" + monthStr;
    }
    let dayStr = (currentDate.getDate()).toString();
    if(dayStr.length == 1) {
        dayStr = "0" + dayStr;
    }
    const dateStr = `${currentDate.getFullYear()}-${monthStr}-${dayStr}`;
    const day = await Day.fromDate(dateStr);
    return day;
}

function saveDay() {
    const day_activities_json = JSON.stringify([window.myEasyMDE.value()]);
    console.log(window.myEasyMDE);
    window.currentDayObj.day_activities_json = day_activities_json;
    window.currentDayObj.save();
}

async function setDayProperties(dayObj, easyMDE) {
    console.log(JSON.stringify(dayObj));
    if(dayObj.day_activities_json != "[null]") {
        easyMDE.value(JSON.parse(dayObj.day_activities_json)[0]);
    }
}

async function createNewDayObj(currentDate, CW) {
    // constructor function automatically
    // creates day object on "window" browser
    // global for easy saving of changes.
    let monthStr = (currentDate.getMonth() + 1).toString();
    if(monthStr.length == 1) {
        monthStr = "0" + monthStr;
    }
    let dayStr = (currentDate.getDate()).toString();
    if(dayStr.length == 1) {
        dayStr = "0" + dayStr;
    }
    const day = new Day(
        null, 
        `${currentDate.getFullYear()}-${monthStr}-${dayStr}`,
        null,
        `${CW}${currentDate.getFullYear()}`
    );
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

function setParamsForCustomCW(calendarWeek, year) {
    const startDate = generateDateRangeGetStartDate(calendarWeek, year);
    const dayParam = Math.floor(startDate.getTime() / 1000);
    const kwParam = calendarWeek;
    const yearParam = year;
    window.location.search = `?kw=${kwParam}&day=${dayParam}&year=${yearParam}`;
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
    document.querySelector("#daterange-current").innerText = generateDateRange(Number(kw), window.currentFullYear);
    return kw;
}

// setSelectKWs: setup the previous and next Kalenderwoche 
// date ranges (for the user to select them if needed).
// - kw_int: kalenderwoche integer
function setSelectKWs(kw_int) {
    let kw_previous = kw_int - 1;
    let previousYear = window.currentFullYear;
    if(kw_previous == 0) {
        kw_previous = 52;
        previousYear = previousYear - 1;
    }
    document.querySelector("#badge-kw-previous").innerText = `KW ${kw_previous}`;
    document.querySelector("#daterange-previous").innerText = generateDateRange(kw_previous, previousYear);
    let previousTimestamp = generateDateRangeGetStartDate(kw_previous, "2026");
    previousTimestamp = Math.floor(previousTimestamp.getTime() / 1000);
    document.querySelector("#daterange-previous-select").addEventListener("click", () => {
        window.location.search = `?kw=${kw_previous}&day=${previousTimestamp}`;
    });
    let kw_next = kw_int + 1;
    let nextYear = window.currentFullYear;
    if(kw_next == 53) {
        kw_next = 1;
        nextYear = nextYear + 1;
    }
    document.querySelector("#badge-kw-next").innerText = `KW ${kw_next}`;
    document.querySelector("#daterange-next").innerText = generateDateRange(kw_next, nextYear);
    let nextTimestamp = generateDateRangeGetStartDate(kw_next, "2026");
    nextTimestamp = Math.floor(nextTimestamp.getTime() / 1000);
    document.querySelector("#daterange-next-select").addEventListener("click", () => {
        window.location.search = `?kw=${kw_next}&day=${nextTimestamp}`;
    });
}

// toggleSelectKWs: close / open the selection menu
// for selecting different kalenderwochen.
function toggleSelectKWs() {
    document.querySelector("#dateranges-select").classList.toggle("hidden");
}

function inputCustomKWGoTo() {
    const kw = document.querySelector("#input-custom-kw").value;
    const year = document.querySelector("#input-custom-year").value;
    let startTimestamp = generateDateRangeGetStartDate(kw, year);
    startTimestamp = Math.floor(startTimestamp.getTime() / 1000);
    if(year != "") {
        window.location.search = `?kw=${kw}&day=${startTimestamp}&year=${year}`;
    } else {
        window.location.search = `?kw=${kw}&day=${startTimestamp}`;
    }
}

function setCurrentDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const dateStr = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    document.querySelector("#current-day-text").innerText = `${dateStr}`;
}

function generateChoiceDays(CW) {
    const startDate = generateDateRangeGetStartDate(CW, window.currentDateObj.getFullYear());
    let daysGen = [];
    for(let i = startDate.getDate(); i != (startDate.getDate() + 5); i++) {
        const currentDate = new Date(startDate.getTime());
        currentDate.setDate(i);
        daysGen.push(`
            <a href="index.html?kw=${CW}&day=${Math.floor(currentDate.getTime() / 1000)}&year=${currentDate.getFullYear()}">
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

async function setup() {
    window.currentFullYear = "2026";
    // Set default calendar week if not set.
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("year")) {
        window.currentFullYear = searchParams.get("year");
        document.querySelector(".header-year").innerText = window.currentFullYear;
    }
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

     // Setup Markdown editor (easyMDE)
    const easyMDE = new EasyMDE({element: document.querySelector("#activities-edit")});
    window.myEasyMDE = easyMDE;

    // Set day in the UI based on params.
    const day = searchParams.get("day");
    if(day != null) {
        setCurrentDay(day);
        // Get the saved days (if any).
        let currentDayTime = new Date(Number(day) * 1000);
        console.log(currentDayTime.toString());
        const dayObj = await getDayForDateStr(currentDayTime);
        if(dayObj !== false) {
            setDayProperties(dayObj, easyMDE);
        } else {
            // Generate a new day object
            // if no saved day is found.
            createNewDayObj(currentDayTime, kw);
        }
        window.currentDateObj = currentDayTime;
        window.currentFullYear = currentDayTime.getFullYear();
    }

    // Generate the links to get to other 
    // days in the current week.
    const choiceDays = generateChoiceDays(Number(kw));
    console.log(choiceDays);
    insertChoiceDays(choiceDays);

    // Bind onclick for displaying the choice of work days.
    document.querySelector("#current-day").addEventListener("click", toggleDisplayChoiceDays);
    // Bind onclick for displaying the choice of calendar weeks.
    document.querySelector("#open-dropdown").addEventListener("click", toggleSelectKWs);
    // Bind onclick for saving changes to the current day.
    document.querySelector("#save-day-btn").addEventListener("click", saveDay);
    // Bind onclick for going to custom calendar week.
    document.querySelector("#input-custom-kw-go").addEventListener("click", inputCustomKWGoTo);

    // test
    /*
    if(!(searchParams.has("year"))) {
        setParamsForCustomCW(25, 2025);
    }
    */
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