export const getCookie = (name) => {
    let cookies = document.cookie
    if (cookies) {
        cookies = cookies.split('; ')
        const needle = cookies.find(cookie => cookie.includes(name))
        const value = needle.split('=')[1]
        return value
    }
}