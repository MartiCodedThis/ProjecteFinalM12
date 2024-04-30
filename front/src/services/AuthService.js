import { v4 as uuidv4 } from 'uuid'

export default class AuthService {
    async register(username, email, password) {
        try {
            // Call API to fetch user
            if (existingUser) {
                throw new Error('User already exists!')
            }
            // Call API to register new user
            return true
        } catch (error) {
            console.error(`Error during registration: ${error.message}`)
            return false
        }
    }

    async login(email, password, token) {
        try {
            // Call API to log in user
            if (user && user.password === password) {
                const token = uuidv4()
                const txToken = db.transaction(['user_tokens'], 'readwrite')
                const userTokensStore = txToken.objectStore('user_tokens')
                await userTokensStore.add({ token, user_id: user.id })
                await txToken.done
                return token
            } else {
                throw new Error('User credentials do not match records!')
            }
        } catch (error) {
            console.error(`Error during login: ${error.message}`)
            return false
        }
    }

    async logout(token) {
        // Call API to log out user
        try {
            
            if (existingToken) {
                await userTokensStore.delete(token)
                console.log("User logout successful")
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