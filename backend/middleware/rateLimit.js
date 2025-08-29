import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false
});

export default apiLimiter;