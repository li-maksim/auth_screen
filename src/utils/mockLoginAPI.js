async function mockLoginAPI({ email, password }) {
    await new Promise((res) => setTimeout(res, 500))

    switch (password) {
        case "1111":
            throw { code: "NETWORK_ERROR", message: "Network error, please try again" }
        case "2222":
            throw { code: "SERVER_ERROR", message: "Server error, please try later" }
        case "3333":
            throw { code: "ACCOUNT_LOCKED", message: "Account locked" }
        case "4444":
            return { token: "token", user: { email }, requires2FA: true }
        default:
            throw { code: "INVALID_CREDENTIALS", message: "Invalid email or password" }
    }
}

export default mockLoginAPI