import { headers } from "next/headers";
import { auth } from "./auth";
//manage-event,joined-event
export const getTokenFromServer = async () => {
    try {
        const jwtToken = await auth.api.getToken({
            headers: await headers(),
        });

        const token = jwtToken?.token;

        if (!token) {
            console.log("JWT token not found");
            return null;
        }

        return token;

    } catch (error) {
        console.error("Failed to get JWT token:", error);
        return null;
    }
};