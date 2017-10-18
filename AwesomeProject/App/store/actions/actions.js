export function isLoggedIn(boolean) {
    return {
        type: 'isLoggedIn',
        boolean
    }
}
export function currentUser(user) {
    return {
        type: 'currentUser',
        user
    }
}
export function patients(data) {
    return {
        type: 'AllPatients',
        data
    }
}
