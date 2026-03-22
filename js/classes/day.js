export class Day {
    constructor(day_id, day_date, day_activities_json, day_cw) {
        this.day_id = day_id;
        this.day_date = day_date;
        this.day_activities_json = day_activities_json;
        this.day_cw = day_cw;
    }

    static async fromCW(cw) {
        const request = new Request(`${window.location.origin}/ausbildungsnachweis-widget/php/day/days_get.php`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ day_cw: "122026"})
            }
        );
        const response = await fetch(request);
        const result = await response.json();
        console.log(result);
        return result;
    }
}