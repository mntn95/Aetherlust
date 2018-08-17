/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { TiDelete } from 'react-icons/ti';

/**
 * Local import
 */
// Composants

// Styles et assets
import './character.sass';

/**
 * Code
 */
class Character extends React.Component {
  static propTypes = {
    movePlayer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    deletePlayer: PropTypes.func.isRequired,
    coordX: PropTypes.number.isRequired,
    coordY: PropTypes.number.isRequired,
  }

  componentDidMount() {
    console.log('Character loaded');
  }

  movePlayer = (e) => {
    const { movePlayer } = this.props;
    movePlayer(e);
  }

  render() {
    const {
      name, color, id, deletePlayer, coordX, coordY,
    } = this.props;
    return (
      <Draggable
        onStop={this.movePlayer}
        bounds="parent"
        defaultPosition={{ x: coordX, y: coordY }}
        handle=".character-cursor"
      >
        <div
          className="character"
        >
          <div
            className="character-nickname"
            style={{
              color,
            }}
          >{name}
            <TiDelete
              className="character-nickname-delete"
              onClick={deletePlayer}
            />
          </div>
          <div
            className="character-cursor"
            id={id}
            style={{
              backgroundColor: color,
            }}
          />
        </div>
      </Draggable>
    );
  }
}

/**
 * Export
 */
export default Character;
