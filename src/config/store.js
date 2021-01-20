import {combineReducers, createStore} from 'redux'
import pushyReducer from '../actor/pushy/reducer'
import worldReducer from '../world/reducer'
import groundReducer from '../world/ground/reducer'
import objectsReducer from '../world/objects/reducer'

const rootReducer = combineReducers({
    pushy: pushyReducer,
    world: worldReducer,
    ground: groundReducer,
    objects: objectsReducer,
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store