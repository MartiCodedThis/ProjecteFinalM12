export default class AuthService {
    async register(data) {
        try {
            const url = process.env.API_URL  + "/register"
            const request = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ name: data.name, email: data.email, password: data.password })
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
			const url = process.env.API_URL  + "/login"
            const request = await fetch(url, {
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
            const url = process.env.API_URL  + "/user"
            const request = await fetch(url, {
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
            alert(`Error d'autenticació: ${error.message}`)
            return false
        }
    }

    async logout(token) {
        try {
            const url = process.env.API_URL  + "/logout"
            const request = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                },
                method: "POST",
            })
            const response = await request.json()
            if (response) {
                console.debug("S'ha pogut tancar la sessió")
                return true
            } else {
                throw new Error("Ha sorgit un error al tancar la sessió!")
            }
        }
        catch (error) {
            console.error('Error de logout:' + error)
            alert(`Error de logout: ${error.message}`)
            return false
        }
    }

    async listUsers(token){
        try{
            const url = process.env.API_URL  + "/userlist"
            const request = await fetch(url, {
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
                throw new Error("Ha sorgit un error al buscar els usuaris")
            }
        }
        catch(error){
            console.error('Error de cerca:' + error)
            return false
        }
    }

    async listAuthUsers(token){
        try{
            const url = process.env.API_URL  + "/authlist"
            const request = await fetch(url, {
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
                throw new Error("Ha sorgit un error al buscar els usuaris")
            }
        }
        catch(error){
            console.error('Error de cerca:' + error)
            return false
        }
    }

    async listUnauthUsers(token){
        try{
            const url = process.env.API_URL  + "/unauthlist"
            const request = await fetch(url, {
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
                throw new Error("Ha sorgit un error al buscar els usuaris")
            }
        }
        catch(error){
            console.error('Error de cerca:' + error)
            return false
        }
    }

    async authorize(token, id){
        try{
            const url = process.env.API_URL  + "/authorize"
            const request = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify({ 'id' : id })
            })
            const response = await request.json()
            if (response) {
                return response
            } else {
                throw new Error("Ha sorgit un error al buscar els usuaris")
            }
        }
        catch(error){
            console.error('Error de cerca:' + error)
            return false
        }
    }
    async unauthorize(token, id){
        try{
            const url = process.env.API_URL  + "/unauthorize"
            const request = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify({ 'id' : id })
            })
            const response = await request.json()
            if (response) {
                return response
            } else {
                throw new Error("Ha sorgit un error al buscar els usuaris")
            }
        }
        catch(error){
            console.error('Error de cerca:' + error)
            return false
        }
    }

    async branca(token, branca_id){
        try{
            const url = process.env.API_URL  + "/branca"
            const request = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify({ 'branca_id' : branca_id })
            })
            const response = await request.json()
            if (response) {
                return response
            } else {
                throw new Error("Ha sorgit un error al assignar la branca")
            }
        }
        catch(error){
            console.error('Error al assignar la branca:' + error)
            return false
        }
    }

    async carrec(token, carrec_id){
        try{
            const url = process.env.API_URL  + "/carrec"
            const request = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify({ 'carrec_id' : carrec_id })
            })
            const response = await request.json()
            if (response) {
                return response
            } else {
                throw new Error("Ha sorgit un error al assignar el carrec")
            }
        }
        catch(error){
            console.error('Error al assignar el carrec:' + error)
            return false
        }
    }
}