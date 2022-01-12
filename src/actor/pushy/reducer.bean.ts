import { actionTypes, TypedAction } from "../../config/types";

const initialState = {
    count: 0,
};

const pushyReducer = (state = initialState, action: TypedAction< typeof initialState>): typeof initialState => {
    switch (action.type) {
        case actionTypes.updateBeanCount:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default pushyReducer;
