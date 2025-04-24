const SERVER = {
    ERR: {
        INTERNAL_SERVER_ERROR(error: any) {
            return `Internal Server Error: ${error}`
        }
    },
    SUCCESS: {

    }
}

export default SERVER;