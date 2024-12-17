import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asynchandler.js"

const verifyHeader = asyncHandler((req , res, next)=>{
    const contentType = req.headers["content-type"]
    if (!contentType || !contentType.includes('application/json'))
        return res.status(415).json(
            new ApiError(415,"Only Json Data is allowed")
    )
    next()
})

export {verifyHeader}