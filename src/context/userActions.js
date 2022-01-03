import axios from 'axios';
const CHARGERS_URL = 'http://20.85.179.80:8080'

export async function getRequests(dispatch,payload){
    dispatch({ type: 'REQUESTS_LOADING'});
    var data = {};
        await axios.get(`${CHARGERS_URL}/chargers`).then(res => {
            data = res
            if (data.data) {
                dispatch({ type: 'REQUESTS_LIST', payload: data.data });
            }
        })
        .catch(err =>{
            console.log(err)
        });
}

export async function newRequest(dispatch,payload) {
    dispatch({ type: 'REQUEST_LOADING' });
    let config = {}
    config = {
        headers: 
        {
        'Content-Type':'application/json',
        }    
        }
    var data = {};
    await axios.get(`${CHARGERS_URL}/chargers/`+payload.chargerID,config
    ).then(res => {
            data = res.data
            data.longitude = res.data.location.longitude
            data.latitude = res.data.location.latitude
    })
    .catch(err =>{
        if(err.response.status===401){
            alert("Your session has expired, please log in.")
        }
    });  
    dispatch({ type: 'REQUEST_LOADING_DONE' });          
return data ;
};