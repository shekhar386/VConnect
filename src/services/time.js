import moment from "moment";

export default class Time {
    static format = "YYYY-MM-DD HH:mm:ss";
    static current() {
        return moment().format(this.format);
    }
    static dateToString(date) {
        return moment(date).format(this.format);
    }
}
