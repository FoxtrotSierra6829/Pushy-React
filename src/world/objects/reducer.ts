const initialState = {
    objects: [],
}

const objectsReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case 'ADD_OBJECTS':
            return {
                ...action.payload
            }
        case 'MOVE_OBJECTS':
        return {
            ...action.payload
            }
        default:
        return state
    }
}


export default objectsReducer