class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);

        super.name = "AuthenticationError";
    }
}

export default AuthenticationError;