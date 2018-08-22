import uuidv4 from 'uuid/v4'; // https://www.npmjs.com/package/uuid

import maps from '../../data/maps';

const rootAnchor = document.getElementById('root');


/**
 * Initial State
 */
const initialState = {
  maps,
  isBoard: false,
  map: 'http://medievalshop.com/parchemin/wp-content/uploads/2013/02/Plan-FG2-Auberge-des-3-anneaux-%C3%A9tage-de-nuit.jpg',
  isMap: true,
  grid: true,
  color: '#f44336',
  toggle: false,
  isSlided: false,
  cpt: 1,
  cptX: 70,
  cptY: 170,
  name: '',
  typingName: '',
  characters: [
    // {
    //   id: uuidv4(),
    //   name: rootAnchor.dataset.name,
    //   color: '#b80000',
    //   coordX: 10,
    //   coordY: 170,
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Varang',
    //   color: '#008b02',
    //   coordX: 10,
    //   coordY: 240,
    // },
    // {
    //   id: uuidv4(),
    //   name: 'ben',
    //   color: '#fccb00',
    //   coordX: 10,
    //   coordY: 310,
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Test2',
    //   color: '#b80000',
    //   coordX: 10,
    //   coordY: 380,
    // },
  ],
};
console.log(initialState.characters);

/**
 * Types
 */
const TOGGLE_SCREEN = 'TOGGLE_SCREEN';
const TOGGLE_GRID = 'TOGGLE_GRID';
const TOGGLE_PICKER = 'TOGGLE_PICKER';
const CHANGE_COLOR = 'CHANGE_COLOR';
const CREATE_PLAYER = 'CREATE_PLAYER';
const INPUT_CHAR_CHANGE = 'INPUT_CHAR_CHANGE';
export const MOVE_PLAYER = 'MOVE_PLAYER';
const RECEIVE_MOVE = 'RECEIVE_MOVE';
const RECEIVE_DELETE = 'RECEIVE_DELETE';
export const DELETE_PLAYER = 'DELETE_PLAYER';
const HANDLE_SLIDE = 'HANDLE_SLIDE';
const CHANGE_MAP = 'CHANGE_MAP';
const AUTO_PLAYER = 'AUTO_PLAYER';
const UPDATE_CHARS = 'UPDATE_CHARS';

/**
 * Traitements
 */

/**
 * Reducer
 */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_SCREEN:
      return {
        ...state,
        isBoard: !state.isBoard,
        isMap: !state.isMap,
      };

    case HANDLE_SLIDE:
      return {
        ...state,
        isSlided: !state.isSlided,
      };

    case TOGGLE_GRID:
      return {
        ...state,
        grid: !state.grid,
      };

    case TOGGLE_PICKER:
      return {
        ...state,
        toggle: !state.toggle,
      };

    case CHANGE_COLOR:
      return {
        ...state,
        color: action.value,
      };

    case CHANGE_MAP:
      console.log(state.map);
      return {
        ...state,
        map: action.value,
      };

    case AUTO_PLAYER: {
      console.log('token reducer', action.char.userName);
      const newChar = {
        id: uuidv4(),
        name: action.char.userName,
        color: state.color,
        coordX: state.cptX,
        coordY: state.cptY,
      };
      if (state.cptY >= 380) {
        state.cptY = 100;
        state.cptX += 70;
      }
      state.cptY += 70;
      return {
        ...state,
        characters: [...state.characters, newChar],
      };
    };

    case CREATE_PLAYER: {
      if (state.characters.length < 20) {
        console.log(state.characters.length);
        const newChar = {
          id: uuidv4(),
          name: state.typingName,
          color: state.color,
          coordX: state.cptX,
          coordY: state.cptY,
        };
        if (state.cptY >= 380) {
          state.cptY = 100;
          state.cptX += 70;
        }
        state.cptY += 70;
        if (newChar.name.length === 0) {
          newChar.name = `Opponent#${state.cpt}`;
          state.cpt += 1;
        }
        console.log(newChar.name);
        return {
          ...state,
          characters: [...state.characters, newChar],
          typingName: '',
        };
      }
      return {
        ...state,
      };
    }
    case INPUT_CHAR_CHANGE:
      return {
        ...state,
        typingName: action.value,
      };

    case RECEIVE_MOVE: {
      console.log('receive move action :', action.characters);
      const filteredChars = state.characters.filter(char => char.name !== action.characters.name);
      console.log('FILTERED :', filteredChars);

      return {
        ...state,
        characters: [...filteredChars, action.characters],
      };
    }
    case RECEIVE_DELETE: {
      const filteredChars = state.characters.filter(char => char.name !== action.characters[0].name);
      console.log('character to kill :', action.characters[0].name);

      return {
        ...state,
        characters: [...filteredChars],
      };
    }
    default:
      return state;
  }
};

/**
 * Action Creators
 */

export const toggleScreen = () => ({
  type: TOGGLE_SCREEN,
});

export const toggleGrid = () => ({
  type: TOGGLE_GRID,
});

export const togglePicker = () => ({
  type: TOGGLE_PICKER,
});

export const changeColor = value => ({
  type: CHANGE_COLOR,
  value,
});

export const changeInput = value => ({
  type: INPUT_CHAR_CHANGE,
  value,
});

export const createPlayer = () => ({
  type: CREATE_PLAYER,
});

export const autoAddPlayer = tokenToAdd => ({
  type: AUTO_PLAYER,
  char: tokenToAdd,
});

export const updateChars = value => ({
  type: UPDATE_CHARS,
  value,
});

export const movePlayer = value => ({
  type: MOVE_PLAYER,
  value,
});

export const receiveMove = characters => ({
  type: RECEIVE_MOVE,
  characters,
});

export const receiveDelete = characters => ({
  type: RECEIVE_DELETE,
  characters,
});

export const deletePlayer = value => ({
  type: DELETE_PLAYER,
  value,
});

export const handleSlide = () => ({
  type: HANDLE_SLIDE,
});

export const changeMap = value => ({
  type: CHANGE_MAP,
  value,
});

/**
 * Selectors
 */

/**
 * Export
 */
export default reducer;
