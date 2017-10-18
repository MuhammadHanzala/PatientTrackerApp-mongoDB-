import fb from '../../firebase';
import { NavigationActions } from 'react-navigation';
import { isLoggedIn, currentUser } from '../actions/actions';
import { AsyncStorage } from 'react-native';

export function signUp(email, password, callback, navigate) {
    return dispatch => {

        fb.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            callback('Loading...')
            fb.database().ref(`/users/${user.uid}`).set({ email, password })
            .then(async () => {
                console.log('User:', user);
                dispatch(isLoggedIn(true));
                dispatch(currentUser(user));
                await AsyncStorage.removeItem('currentUser');
                await AsyncStorage.setItem('currentUser', JSON.stringify(user));
                navigate();
                })
        })

        .catch((error) => {
            // Handle Errors here.
            if (error) {
                console.log(error)
                callback(error.message);
            }
            // ...
        });
    }
}
export const login = (email, password, callback, navigate) => {
    return dispatch => {

        fb.auth().signInWithEmailAndPassword(email, password)
            .then(async (user) => {
                await AsyncStorage.removeItem('currentUser');                
                await AsyncStorage.setItem('currentUser', JSON.stringify(user));
                navigate('HomePage');
            })
            .catch((error) => {
                // Handle Errors here.
                if (error) {
                    console.log(error)
                    callback(error.message);
                }
                // ...
            });
    }
}

export function signout(navigate) {
    return dispatch => {
        fb.auth().signOut().then(() => {
            // Sign-out successful.
            AsyncStorage.removeItem('currentUser');
                AsyncStorage.getItem('currentUser', (err, result) => {
                    console.log(err, result);
                });
                
            navigate();
            dispatch(isLoggedIn(false));
            console.log("signout successful")
        }).catch(function (error) {
            // An error happened.
            console.log(error)
        });
    }
}

export function chkUser() {
    return dispatch => {
        fb.auth().onAuthStateChanged((user) => {
            if (!user) {
                return isLoggedIn(false);

            } else {
                return isLoggedIn(true);
            }
        })
    }
}