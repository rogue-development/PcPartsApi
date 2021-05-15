import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as UUID } from 'uuid';
import 'colors'

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
        type: String,
    },
    last_login_date: {
        type: Date
    },
    roles: {
        type: Array,
        default: ["unverified", "user"]
    },
    sessions: [
        {
            _id: {
                type: String,
                required: true
            },
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
    static async register(user, ip) {
        // Ensure data is valid
        if (user.password != user.repeat_password) throw new UserInputError("Passwords do not match");
        if ((await mdbUser.find({ email: user.email })).length > 0 || (await mdbUser.find({ username: user.username })).length > 0) throw new AuthenticationError("Username or email is already taken");

        let user2 = {};
        Object.assign(user2, user);

        // Set default random avatar
        user.avatar = `https://avatars.dicebear.com/api/identicon/${UUID}.svg`

        // Encrypt password
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        await new mdbUser(user).save();

        const storedUser = await mdbUser.findOne({ email: user.email });
        const authToken = await this.login(user2, ip)

        return {
            user: storedUser,
            authToken: authToken
        };
    }

    static async login(user, ip) {
        const dbUser = await mdbUser.findOne({ email: user.email });

        if (!dbUser) {
            throw new AuthenticationError("User doesn't exist");
        }

        let id = UUID();

        if (await bcrypt.compare(user.password, dbUser.password)) {
            let updated = await mdbUser.findByIdAndUpdate(
                {
                    "_id": dbUser._id
                },
                {
                    $addToSet: {
                        sessions: {
                            _id: id,
                            creation_date: Date.now(),
                            expiry_date: new Date(new Date().setDate(new Date().getDate() + 30)),
                            ip: ip,
                            active: true
                        }
                    }
                },
                {
                    new: true,
                    useFindAndModify: false
                }
            ).exec();
            let newSess = updated.sessions.find(o => o._id === id);
            return jwt.sign({ ssid: newSess.id, exp: Math.floor(new Date(newSess.expiry_date) / 1000) + (60 * 60), iss: "PC Parts Api", iat: Math.floor(new Date(newSess.creation_date) / 1000) + (60 * 60) }, process.env.JWT_PRIV_KEY)
        }
        throw new AuthenticationError("Password is incorrect");
    }

    static async getUserByToken(token) {
        let decoded = await jwt.verify(token.split("Bearer ")[1], process.env.JWT_PRIV_KEY, (err, decoded) => {
            return decoded;
        })
        let user = await mdbUser.findOne({ "sessions._id": decoded.ssid })
        if (user == null) return null;

        let session = user.sessions.find(sess => sess._id == decoded.ssid);
        if (session.active == true && new Date(session.expiry_date) > Date.now()) {
            return {
                roles: user.roles,
                session: session
            }
        } else {
            return null;
        }
    }
}