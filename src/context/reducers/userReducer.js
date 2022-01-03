const initialState = {
    loadingRequest: false,
    loadingRequests: false,
    requests:[],
};

const userReducer = (state = initialState,action) =>{
   const {type,payload} = action;
   switch (type) {
        case "REQUESTS_LIST":
            return {
            ...state,
            loadingRequests:false,
            requests: payload.chargers
            }
        case "REQUEST_LOADING":
            return {
            ...state,
            loadingRequest: true
        }
        case "REQUEST_LOADING_DONE":
            return {
            ...state,
            loadingRequest: false
        }
        case "REQUESTS_LOADING":
            return {
            ...state,
            loadingRequests: true
        }
       default:
           return state;
   }
}

export default userReducer;