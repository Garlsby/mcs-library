import axios from "axios";

export const Login = async(email, pass) => {
    const url = `${import.meta.env.VITE_AUTHENTICATION_URL}/login-user`
    try {
        const response = await axios.post(url, { 
            "emailaddress": email,
            "password": pass
        })
        return response
    }catch(error) {
        console.error(error)
    }
}