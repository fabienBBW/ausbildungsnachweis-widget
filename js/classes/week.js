class Week {
    constructor(week_id = null, week_timestamp, week_cw) {
        this.week_id = null;
        this.week_timestamp = week_timestamp;
        this.week_cw = week_cw;
    }

    static async getAll() {
        const request = new Request(`${window.location.origin}/ausbildungsnachweis-widget/php/week/weeks_get.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const response = await fetch(request);
        const result = await response.json();
        console.log(`week.getAll result: ${result}`);
        return result;
    }
}