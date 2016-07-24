import BelliesSchema from "./BelliesSchema";

export default class AccountSchema extends BelliesSchema {
    constructor() {
        super("account", {
            firstName: String,
            lastName: String,
            gender: String,
            month: String,
            day: String,
            year: String,
            email: String,
            password: String
        });
    }

    login(email, password, callback, errCallback) {
        return this.get({email: email, password: password}, function (account) {
            if (!account) {
                return errCallback(`The account ${email} is either not found or the provided password is incorrect.  Please try again.`);
            }

            callback({
                loggedIn: true,
                firstName: account.firstName,
                lastName: account.lastName,
                gender: account.gender,
                month: account.month,
                day: account.day,
                year: account.year,
                email: account.email,
                password: account.password,
                _id: account._id
            });
        }, errCallback);
    }
}
