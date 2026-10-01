import axios from "axios";
import { env } from "../config/env.js";

export const sendOTP = async (mobile, otp) => {
    const phone = `91${mobile}`;

    console.log("Sending OTP to:", phone);
    console.log("Sending OTP with value:", otp);

    try {
        const response = await axios.post(
            `${env.WHATSAPP_API_URL}?phonenumberID=${env.WHATSAPP_PHONE_NUMBER_ID}`,
            {
                messaging_product: "whatsapp",
                to: phone,
                type: "template",

                template: {
                    name: "loginotpa",

                    language: {
                        code: "en"
                    },

                    components: [
                        // BODY
                        {
                            type: "BODY",
                            parameters: [
                                {
                                    type: "text",
                                    text: String(otp)
                                }
                            ]
                        },

                        // URL BUTTON
                        {
                            type: "button",
                            sub_type: "url",
                            index: "0",
                            parameters: [
                                {
                                    type: "text",
                                    text: String(otp)
                                }
                            ]
                        }
                    ]
                }
            },
            {
                headers: {
                    Authorization: `Basic ${env.WHATSAPP_AUTH_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("WhatsApp API status:", response.status);
        console.log(
            "WhatsApp API response:",
            JSON.stringify(response.data, null, 2)
        );

        return response.data;

    } catch (error) {
        console.error(
            "WhatsApp API status:",
            error.response?.status
        );

        console.error(
            "WhatsApp API response:",
            JSON.stringify(error.response?.data, null, 2)
        );

        console.error(
            "WhatsApp API headers:",
            error.response?.headers
        );

        throw error;
    }
};