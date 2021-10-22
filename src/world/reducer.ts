const initialState = {
    level: 1
}

const worldReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case 'CHANGE_LEVEL':
            return {
                ...action.payload
            }
        default:
        return state
    }
}


export default worldReducer