import uuidv4 from 'uuid/v4'; // https://www.npmjs.com/package/uuid

const rootAnchor = document.getElementById('root');

/**
 * Initial State
 */
const initialState = {
  userName: rootAnchor.dataset.name,
  role: rootAnchor.dataset.role,
  charSheet: 'tempthree',
  roomId: rootAnchor.dataset.room,
  selfId: rootAnchor.dataset.playerid,
};

/**
 * Types
 */
const DO_SOMETHING = 'DO_SOMETHING';
export const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';

/**
 * Traitements
 */
// const numberOfSides = dice.slice(2);


/**
 * Reducer
 */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DO_SOMETHING:
      return {
        ...state,
      };

    case WEBSOCKET_CONNECT:
      return {
        ...state,
        // A la connexion au socket
        // J'attribue un id unique à chaque User
        // Afin de permettre de déterminer qui à envoyé le message
        // userId: uuidv4(),
      };
    default:
      return state;
  }
};

/**
 * Action Creators
 */

export const doSomething = () => ({
  type: DO_SOMETHING,
});

export const websocketConnect = () => ({
  type: WEBSOCKET_CONNECT,
});
/**
 * Selectors
 */

/**
 * Export
 */
export default reducer;