export default class User {
    token = null;
    loggedIn = false;

    constructor(account) {
        for (let key in account.user) {
            this[key] = account.user[key];
        }

        this.token = account.token;
        this.loggedIn = account.loggedIn;
    }

    isInRole = roles => {
        if (!roles || !this.roles) return false;
        roles = roles.split('|');
        for (let role of roles) {
            if (this.roles.any(r => r.name === role && r.status === 'Active')) return true;
        }
        return false;
    }

    hasCap = (caps) => {
        if (this.isInRole("Administrators")) return true;

        if (!caps || !this.caps) return false;


        caps = caps.split('|');

        for (let cap of caps) {
            if (this.caps.indexOf(cap) > -1) return true;
        }

        return false;
    }
}