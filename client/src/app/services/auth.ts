export function getToken() {
    const auth = window.localStorage.getItem("user.auth");

    if (auth === null) {
        return null;
    }

    try {
        const { expire, token } = JSON.parse(auth);

        if (!expire || !token) {
            return false
        }

        const now = Date.now();
        const expireTime = (new Date(expire)).getTime();

        if (now >= expireTime) {
            window.localStorage.removeItem('user.auth')
            return null
        }

        return token;
    } catch {
        return null
    }
}