import expressrl from "express-rate-limit"

export const apiRLimit = expressrl({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20, // limit each IP to 2 requests per windowMs
    message: {
        success: false,
        message: "Too many requests from this IP, please try again later"
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

