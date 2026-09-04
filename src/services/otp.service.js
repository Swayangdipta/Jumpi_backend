const otpStore = new Map();

const OTP_EXPIRY = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export const generateOTP = (mobile) => {

    const otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    otpStore.set(mobile, {
        otp,
        attempts: 0,
        expiresAt: Date.now() + OTP_EXPIRY
    });

    return otp;

};

export const verifyOTP = (mobile, otp) => {

    const record = otpStore.get(mobile);

    if (!record) {
        return {
            success: false,
            message: "OTP not found."
        };
    }

    if (Date.now() > record.expiresAt) {

        otpStore.delete(mobile);

        return {
            success: false,
            message: "OTP expired."
        };

    }

    if (record.attempts >= MAX_ATTEMPTS) {

        otpStore.delete(mobile);

        return {
            success: false,
            message: "Maximum attempts exceeded."
        };

    }

    if (record.otp !== otp) {

        record.attempts++;

        return {
            success: false,
            message: "Invalid OTP."
        };

    }

    otpStore.delete(mobile);

    return {
        success: true
    };

};

export const clearOTP = (mobile) => {

    otpStore.delete(mobile);

};