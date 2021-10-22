const initialState = {
    position: [5,7],
    rotation:0,
}

const pushyReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case 'MOVE_PUSHY':
            return {
                ...action.payload
            }
        default:
        return state
    }
}


export default pushyReducer