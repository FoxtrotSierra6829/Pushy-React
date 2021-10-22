const initialState = {
    count: 0,
}

const pushyReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case 'BEAN':
            return {
                ...action.payload
            }
        default:
        return state
    }
}


export default pushyReducer