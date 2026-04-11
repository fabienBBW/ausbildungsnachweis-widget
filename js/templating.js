import { Week } from "./classes/week.js";
import { Day } from "./classes/day.js";

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

async function convert() {
    document.querySelector("#pe-lastname-firstname").innerText = "Sonpar, Fabien";
    document.querySelector("#pe-place-of-birth").innerText = "Bad Soden-Salmünster";
    document.querySelector("#pe-date-of-birth").innerText = "17.12.2000";
    document.querySelector("#pe-address").innerText = "Berliner Straße 63, 61118";
    const weeks = await Week.getAll();
    for (const [i, week] of weeks.entries()) {
        const days = await Day.fromCW(week.week_cw);
        const dateRange = generateDateRange((week.week_cw.toString()).substring(0, 2), (week.week_cw.toString()).substring(2));
        const html = `
            <div id="ab-${i}">
                <h1>
                    Ausbildungsnachweis ${i + 1}
                </h1>
                <div>
                <table id="details-personals">
                    <tr>
                        <td>
                            Name des/der Auszubildenden:
                        </td>
                        <td>
                            Max Mustermann
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Ausbildungsjahr:
                        </td>
                        <td>
                            BvB
                        </td>
                        <td>
                            Ggf. ausbildende Abteilung:
                        </td>
                        <td>
                            Office & IT
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Ausbildungswoche vom:
                        </td>
                        <td>
                            ${dateRange}
                        </td>
                    </tr>
                </table>
                </div>
                <div>
                <table class="hours" id="hours-${i}">
                    <tr>
                        <th>

                        </th>
                        <th>
                            Betriebliche Tätigkeiten, Unterweisungen bzw. überbetriebliche 
Unterweisungen (z. B. im Handwerk), <br /> betrieblicher Unterricht, sonstige 
Schulungen, Themen des Berufsschulunterrichts
                        </th>
                        <th>
                            Stunden
                        </th>
                    </tr>
                </table>
                </div>
            </div>
        `;
        document.querySelector("#ausbildungsnachweise").insertAdjacentHTML("beforeend", html);

        // iterate over days.
        for(const day of days) {
            const dayDate = new Date(day.day_date);
            const insertDetails = `
                <tr>
                    <td>
                        ${dayDate.toLocaleDateString("de-DE", {weekday: "long"})}
                    </td>
                    <td>
                        ${day.day_activities_json}
                    </td>
                </tr>
            `;
            document.querySelector(`#hours-${i}`).insertAdjacentHTML("beforeend", insertDetails);
        }
    }
}

convert();