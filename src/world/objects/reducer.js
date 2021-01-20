const initialState = {
    objects: [],
}

const objectsReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'ADD_OBJECTS':
            return {
                ...action.payload
            }
        default:
        return state
    }
}


export default objectsReducer