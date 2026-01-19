import {User} from "../models/user.models.js"
import {ApiResponse} from "../utils/api-response.js"
import {ApiError} from "../utils/api-errors.js"
import {asyncHandler} from "../utils/async-handler.js"
import {sendMail} from "../utils/mail.js"
import Mailgen from "mailgen"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
         const user = await User.findByid(userId)
         const accessToken = user.generateAccessToken()
         const refreshToken = user.generateRefreshToken()

         user.refreshToken = refreshToken
         await user.save({validateBeforeSave: false})

        return (accessToken, refreshToken)
        
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating access token")
    }
}

const registerUser = asyncHandler(async (req,res) => {
    const {email,username,password,role} = req.body

    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username is already exists", [])
    }

    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false
    })

    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken()

    user.emailVerificationToken = hashedToken
    user.emailVerificationToken = tokenExpiry
    await user.save({validateBeforeSave: false})

    await sendMail(
        {
            email: user?.email,
            subject:"please verify your email",
            mailgenContent: emailVerificationMailgenContent(
                user.username,
                `${req.protocol}//${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
            )
        }
    )

    const createdUser = await user.findByid(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )

    if(!createdUser){
        throw new ApiError(500, "something went wrong while registering a user")
    }

    return res
            .status(201)
            .json(
                new ApiResponse(200,
                    {user: createdUser},
                    "User registered successfully and varification email has been sent on your email"
                )
            )

})

export {registerUser}