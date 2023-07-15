
function DateComposer(initial) {

    this.initial = initial || new Date();

    this.composer = (payload = 0) => {
        const instance = new Date(this.initial);
        instance.setDate(instance.getDate() + payload);

        const date_split = instance.toDateString().split(' ');
        const time_split = instance.toLocaleTimeString().split(' ')[0].split(':');

        const date = {
            day: Number(date_split[2]),
            month: date_split[1],
            year: Number(date_split[3])
        }

        const time = {
            hour: Number(time_split[0]),
            minute: Number(time_split[1]),
            second: Number(time_split[2].substr(0, 2)),
            phase: time_split[2].substr(3)
        }

        return { date, time }
    }

    this.now = () => {
        return this.composer()
    }

    this.past = (payload = 0) => {
        return this.composer(-payload)
    }

    this.future = (payload = 0) => {
        return this.composer(payload)
    }

    this.isGreaterMonth = (a, b) => {
        const month = {
            "Jan": 1,
            "Feb": 2,
            "Mar": 3,
            "Apr": 4,
            "May": 5,
            "Jun": 6,
            "Jul": 7,
            "Aug": 8,
            "Sep": 9,
            "Oct": 10,
            "Nov": 11,
            "Dec": 12
        };

        const index1 = month[a];
        const index2 = month[b];

        if (index1 === index2) return 0;
        if (index1 > index2) return 1;

        return 2;
    }


    this.isExpired = (payload) => {

        if (!payload) {
            throw new Error('Invalid Comparable input');
        }

        if (!payload.date || !payload.time) {
            throw new Error('Invalid Comparable input');
        }

        const today = this.composer();

        if (today.date.year < payload.date.year) {
            return false;
        }

        if (today.date.year > payload.date.year) {
            return true;
        }

        const result = this.isGreaterMonth(today.date.month, payload.date.month);

        if (result === 2) {
            return false;
        }

        if (result === 1) {
            return true;
        }

        if (today.date.day < payload.date.day) {
            return false;
        }

        if (today.date.day > payload.date.day) {
            return true;
        }

        if (today.time.phase === 'PM' && payload.time.phase === 'AM') {
            return true;
        }

        if (today.time.phase === 'AM' && payload.time.phase === 'PM') {
            return false;
        }

        if (today.time.hour < payload.time.hour) {
            return false;
        }

        if (today.time.hour > payload.time.hour) {
            return true;
        }

        if (today.time.minute < payload.time.minute) {
            return false;
        }

        if (today.time.minute > payload.time.minute) {
            return true;
        }

        return true;
    }
}

module.exports = { DateComposer }