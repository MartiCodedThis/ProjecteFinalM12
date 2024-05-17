export default class TaskService {
    async get(token, task_id){
        try {
            const url = process.env.API_URL  + `/tasks/${task_id}`
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
                return response
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(`Error al cercar la tasca: ${error.message}`)
            alert(`Error al cercar la tasca': ${error.message}`)
            return false
        }
    }
    async list(token, id){
        try {
            const url = process.env.API_URL  + `/tasks/list/${id}`
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
                return response.tasks
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(`Error al accedir a les tasques: ${error.message}`)
            alert(`Error al accedir a les tasques': ${error.message}`)
            return false
        }
    }
    async list_by_user(token, id){
        try {
            const url = process.env.API_URL  + `/tasks/user/${id}`
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
                return response.user_tasks
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(`Error al accedir a les tasques: ${error.message}`)
            alert(`Error al accedir a les tasques': ${error.message}`)
            return false
        }
    }

    async list_by_branca(token, id){
        try {
            const url = process.env.API_URL  + `/tasks/branca/${id}`
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
                return response.branca_tasks
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(`Error al accedir a les tasques: ${error.message}`)
            return false
        }
    }
    async create(token, data){
        try {
            const url = process.env.API_URL  + "/tasks/create"
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
                return response.tasks
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(`Error al crear la tasca: ${error.message}`)
            return false
        }
    }
    async update(token, id, data){
        try {
            const url = process.env.API_URL  + `/tasks/${id}`
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
                return response.tasks
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(`Error al actualitzar la tasca: ${error.message}`)
            return false
        }
    }
}