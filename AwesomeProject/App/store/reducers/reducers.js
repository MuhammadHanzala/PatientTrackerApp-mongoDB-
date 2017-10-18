export default function (state = {isLoggedIn: false, user: null, patients: null}, action){
    switch(action.type){
        case 'isLoggedIn':
            return {isLoggedIn: action.boolean};
        case 'currentUser':
            return { user: action.user };
        case 'AllPatients':
            return { patients: action.data }
        default:
         return state; 
    }
}