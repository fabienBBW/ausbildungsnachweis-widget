export class Day {
    constructor(day_id, day_date, day_activities_json, day_cw, week_timestamp = null) {
        this.day_id = day_id;
        this.day_date = day_date;
        this.day_activities_json = day_activities_json;
        this.day_cw = day_cw;
        this.week_timestamp = week_timestamp;
        this.week_cw = day_cw;
        window.currentDayObj = this;
    }

    async save() {
        const request = new Request(`${window.location.origin}/ausbildungsnachweis-widget/php/day/day.php`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this)
            }
        );
        const response = await fetch(request);
        const result = await response.json();
        console.log(`day save result: ${result}`);
        if(result.day_ret !== false && result.day_ret !== true) {
            this.day_id = result.day_ret;
        }
        return result;
    }
 
    static async fromDate(dateStr) {
        const request = new Request(`${window.location.origin}/ausbildungsnachweis-widget/php/day/day_get.php`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ day_date: dateStr })
            }
        );
        const response = await fetch(request);
        const result = await response.json();
        console.log(`day.fromdate result: ${result}`);
        if(result != false) {
            const day = new Day(result.day_id, result.day_date, result.day_activities_json, result.day_cw);
            return day;
        } else {
            return result;
        }
    }

    static async fromCW(cw) {
        const request = new Request(`${window.location.origin}/ausbildungsnachweis-widget/php/day/days_get.php`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ day_cw: cw })
            }
        );
        const response = await fetch(request);
        const result = await response.json();
        console.log(result);
        return result;
    }
}