class AuthorizationError extends Error {
    constructor(message: string) {
        super(message);

        super.name = "AuthorizationError";
    }
}

export default AuthorizationError;