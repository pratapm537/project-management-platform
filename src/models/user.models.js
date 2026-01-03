import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        avatar: {
            type: String,
            localPath: String
        },
        default: {
            url: `https://placehold.co/200*200`,
            localPath: ""
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowerCase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowerCase: true,
            trim: true
        },
        fullName: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: [true, "password is required"]
        },
        isEmailVerfied: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String
        },
        forgotPasswordToken: {
            type: String
        },
        forgotPasswordExpiry: {
            type: Date
        },
        emailVerificationToken: {
            type: String
        },
        emailVerificationExpiry: {
            type: Date
        }
        
    }, {
        timestamps: true //create at date & updated at date
    }
)

export const User = mongoose.model("User", userSchema)