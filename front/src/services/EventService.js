export default class EventService {
    async get(token, event_id){
        try {
            const url = process.env.API_URL  + `/events/${event_id}`
            let request = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                },
                method: "GET",
            })
            const response = await request.json()
            if (response.success) {
                return response.event
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(`Error al cercar l'esdeveniment: ${error.message}`)
            alert(`Error al cercar l'esdeveniment': ${error.message}`)
            return false
        }
    }
    async list(token){
        try {
            const url = process.env.API_URL  + "/events"
            let request = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                },
                method: "GET",
            })
            const response = await request.json()
            if (response.success) {
                return response.events
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(`Error al accedir als esdeveniments: ${error.message}`)
            alert(`Error al accedir als esdeveniments': ${error.message}`)
            return false
        }
    }
    async create(token, data){
        try {
            const url = process.env.API_URL  + "/events/create"
            let request = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify(data),
            })
            const response = await request.json()
            if (response.success) {
                return response.events
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(`Error al crear l'esdeveniment: ${error.message}`)
            return false
        }
    }
    async update(){

    }
}