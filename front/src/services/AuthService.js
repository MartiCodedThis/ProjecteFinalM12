export default class AuthService {
    async register(data) {
        try {
            // Call API to register new user
            request = await fetch(process.env.URL_API + "/register", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: { name: data.username, email: data.email, password: data.password }
            })
            const response = await request.json()
            if (response.success) {
                console.debug("registered")
                return true
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(`Error d'enregistrament: ${error.message}`)
            alert(`Error d'enregistrament': ${error.message}`)
            return false
        }
    }

    async login(data) {
        try {
            const request = await fetch("http://127.0.0.1:8000/api" + "/login", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ email: data.email, password: data.password })
            })
            const response = await request.json()
            if (response.success) {
                console.debug("logging in")
                return response.authToken
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(`Error d'autenticació: ${error.message}`)
            alert(`Error d'autenticació: ${error.message}`)
            return false
        }
    }

    async getUser(token) {
        try {
            const request = await fetch("http://127.0.0.1:8000/api" + "/user", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                },
                method: "GET",
            })
            const response = await request.json()
            if (response) {
                return response
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(`Error d'autenticació: ${error.message}`)
            alert(`Error d'autenticació: ${error.message}`)
            return false
        }
    }

    async logout(token) {
        // Call API to log out user
        try {
            const request = await fetch("http://127.0.0.1:8000/api" + "/logout", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                },
                method: "GET",
            })
            const response = await request.json()
            if (response) {
                console.debug("User logout successful")
                return true
            } else {
                throw new Error("Could not log user out!")
            }
        }
        catch (error) {
            console.error('Error during logout:' + error)
            return false
        }
    }
}