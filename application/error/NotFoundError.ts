class NotFoundError extends Error {
    constructor(message: string) {
        super(message);

        super.name = "NotFoundError";
    }
}

export default NotFoundError;