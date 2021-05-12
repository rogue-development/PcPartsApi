import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    last_login_date: {
        type: Date
    },
    roles: {
        type: Array,
        default: ["unverified"]
    },
    sessions: [
        {
            creation_date: {
                type: Date,
                required: true,
            },
            expiry_date: {
                type: Date,
                required: true,
            },
            ip: {
                type: String,
                required: true
            },
            active: {
                type: Boolean,
                required: true,
                default: true
            }
        }
    ]
})

const userConn = mongoose.connection.useDb("Users");
const mdbUser = userConn.model("User", userSchema);

export class User {
    static async register(user) {
        // Ensure data is valid
        if (user.password != user.repeat_password) throw new UserInputError("Passwords do not match");
        if ((await mdbUser.find({ email: user.email })).length > 0 || (await mdbUser.find({ username: user.username })).length > 0) throw new AuthenticationError("Username or email is already taken");

        // Encrypt password
        bcrypt.hash(user.password, 10, (err, hash) => {
            user.password = hash;
            new mdbUser(user).save();
        });
        return user;
    }

    static async login(user, ip) {
        const dbUser = await mdbUser.findOne({ email: user.email });

        if (!dbUser) {
            throw new AuthenticationError("Users doesn't exist");
        }

        if (await bcrypt.compare(user.password, dbUser.password)) {
            await dbUser.updateOne({
                $addToSet: {
                    sessions: {
                        creation_date: Date.now(),
                        expiry_date: new Date(new Date().setDate(new Date().getDate() + 30)),
                        ip: ip,
                        active: true
                    }
                }
            });
            return true;
        }
        return false;
    }

    static async getUserByToken(token) {
        const user = await mdbUser.findOne({ username: token });

        if (!user) return null;

        return {
            roles: user.roles,
            sessions: user.sessions
        }
    }
}