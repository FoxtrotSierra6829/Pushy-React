export const actionTypes = {
  addGround: 'ADD_GROUND',
  addLevelName: 'ADD_LEVELNAME',
  addObjects: 'ADD_OBJECTS',
  changeLevel: 'CHANGE_LEVEL',
  moveObjects: 'MOVE_OBJECTS',
  movePushy: 'MOVE_PUSHY',
  updateBeanCount: 'UPDATE_BEAN_COUNT',
  updateGround: 'UPDATE_GROUND',
}
export interface PushyAction {
  type: typeof actionTypes.movePushy
  payload: {
    position: number[]
    rotation: number
  }
}
export interface PushyState {
  position: number[]
  rotation: number
}
