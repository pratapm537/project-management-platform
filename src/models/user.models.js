import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"


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

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

//compare entred password with stored password
//return true if both match, else false
userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
export const User = mongoose.model("User", userSchema)