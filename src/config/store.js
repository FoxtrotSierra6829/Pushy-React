import {combineReducers, createStore} from 'redux'
import pushyReducer from '../actor/pushy/reducer'
import beanReducer from '../actor/pushy/reducer.bean'
import worldReducer from '../world/reducer'
import groundReducer from '../world/ground/reducer'
import objectsReducer from '../world/objects/reducer'
import levelnameReducer from '../world/levelname/reducer'

const rootReducer = combineReducers({
    pushy: pushyReducer,
    world: worldReducer,
    ground: groundReducer,
    objects: objectsReducer,
    levelname: levelnameReducer,
    bean: beanReducer,
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store