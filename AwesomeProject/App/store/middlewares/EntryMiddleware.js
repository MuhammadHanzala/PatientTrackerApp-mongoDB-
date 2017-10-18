import axios from 'axios';
import { patients } from '../actions/actions';
const rootURL = 'https://saylanifyp.herokuapp.com';

export function createEntry(details, navigate) {
    return dispatch => {
        axios.post(`${rootURL}/api/entries`, details)
            .then((response) => {
                if (response.status === 200 && response.data.error === undefined) {
                    // console.log(response.data);
                    dispatch(getAllEntries(details.doctorId));
                    navigate('HomePage');
                }
                else if (response.data.error) {
                    console.log('Error: ', response.data.error);
                }
                else {
                    console.log('Something Went Wrong');
                }
            })
            .catch((error) => {
                console.log('Error:', error);
            })
    }
}
export function getAllEntries(doctorId) {
    return dispatch => {
        console.log(typeof(doctorId));
        axios.get(`${rootURL}/api/entries/${doctorId}`)
            .then((res) => {
                if (res.status === 200 && res.data.error === undefined) {
                    dispatch(patients(res.data));
                    console.log(res.data);
                }
                else if (res.data.error) {
                    console.log('Error: ', res.data.error);
                }
                else {
                    console.log('Something Went Wrong');
                }
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
    }
}
export function editEntry(newDetails, callback) {
    return dispatch => {
        axios.put(`${rootURL}/api/entries/${newDetails._id}`, newDetails)
            .then((res) => {
                callback(res.data);
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
    }
}
export function deleteEntry(entry) {
    return dispatch => {
        axios.delete(`${rootURL}/api/entries/${entry._id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
    }
}

