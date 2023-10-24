
function get_current_day() {
    let today_in_nl = new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" });
    return new Date(today_in_nl).getHours();
}

module.exports = {
    get_current_day
}