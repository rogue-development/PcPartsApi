import mongoose, { Schema } from 'mongoose'
import { v4 as UUID } from 'uuid';

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

export async function validate(token) {
    if (!token) throw new Error("Token is required for verification");
    let verificationToken = await mdbToken.findOne({ token: token });
    if (!verificationToken) throw new Error("Token isn't found in the database");

    console.log(verificationToken);
    // if(token.expiry_time)
}

export function isValid(token) {
    return true
}