import mongoose, { Schema } from 'mongoose'
import { v4 as UUID } from 'uuid';
import 'colors';

let verificationToken_schema = new Schema({
    token: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    expiry_time: {
        type: Date,
        required: true
    },
    creation_date: {
        type: Date,
        required: true
    }
});

const userConn = mongoose.connection.useDb("Users");
const mdbToken = userConn.model("VerificationTokens", verificationToken_schema);

export async function generate(expiration_time, email) {
    if ((typeof expiration_time) !== 'number') {
        throw new Error("expiration_time needs to be a number")
    }

    if (!email) throw new Error("Email must be provided");

    let exp_time = expiration_time || 5 * 60
    let exp_time_date = new Date(new Date().setSeconds(new Date().getSeconds() + exp_time));

    let token = UUID();

    await new mdbToken({
        token: token,
        email: email,
        expiry_time: exp_time_date.toString(),
        creation_date: new Date().toString()
    }).save()

    return token;
}

export function validate(token) {
    return new Promise(async (resolve, reject) => {
        if (!token) return reject("Token can't be empty");
        let verificationToken = await mdbToken.findOne({ token: token });
        if (!verificationToken) return reject("Token does not exist in database");

        if (verificationToken.expiry_time < new Date()) {
            return reject("Token is expired");
        } else {
            return resolve("Token is valid");
        }
    });
}

export async function isValid(token) {
    return await validate(token).then((val) => {
        return true;
    }).catch((err) => {
        return false;
    })
}

export async function cleanTokens() {
    console.log("Cleaning tokens".bgGreen.bold);
    let tokens = await mdbToken.find();
    tokens.forEach(token => {
        if (token.expiry_time < new Date()) {
            mdbToken.deleteOne({ token: token.token });
        }
    })
}