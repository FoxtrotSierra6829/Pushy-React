import { actionTypes, TypedAction } from "../../config/types";

const initialState = {
    position: [5,7],
    rotation: 0,
};

const pushyReducer = (state = initialState, action: TypedAction< typeof initialState>): typeof initialState => {
    switch (action.type) {
        case actionTypes.movePushy:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default pushyReducer;
