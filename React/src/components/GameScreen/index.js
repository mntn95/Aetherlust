/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { GithubPicker } from 'react-color';
/**
 * Local import
 */
// Composants

// Styles et assets
import './gamescreen.sass';

/**
 * Code
 */
class GameScreen extends React.Component {
  static propTypes = {
    toggleScreen: PropTypes.func.isRequired,
    board: PropTypes.bool.isRequired,
    map: PropTypes.bool.isRequired,
  };

  state = {
    // board: false,
    // map: true,
    grid: true,
    color: '#d4c4fb',
    toggle: false,
    moving: false,
    created: false,
    playerOne: {
      typingName: '',
      name: '',
      coordX: '',
      coordY: '',
    },
  }

  componentDidMount() {
    console.log('gameScreen loaded');
  }

  handleGrid = () => {
    const { grid } = this.state;

    this.setState({
      grid: !grid,
    });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      playerOne: {
        typingName: value,
      },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { playerOne } = this.state;
    const { typingName } = this.state.playerOne;
    this.setState({
      playerOne: {
        name: typingName,
        ...playerOne,
      },
    });
  }

  handleClick = () => {
    const { board, map } = this.state;
    console.log(this.state);

    this.setState({
      board: !board,
      map: !map,
    });
  }

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
    console.log(this.state);
    this.togglePicker();
  };

  togglePicker = () => {
    const { toggle } = this.state;

    this.setState({
      toggle: !toggle,
    });
  }

  createPlayer = () => {
    this.setState({
      moving: true,
    });
  }

  displayPlayer = (e) => {
    const { playerOne } = this.state;
    this.setState({
      playerOne: {
        ...playerOne,
        coordX: e.pageX,
        coordY: e.pageY,
      },
      // moving: false,
      created: true,
    });
  }

  render() {
    const {
      // board,
      // map,
      grid,
      color,
      toggle,
      moving,
      created,

    } = this.state;
    const { toggleScreen, board, map } = this.props;
    const {
      typingName, name, coordX, coordY,
    } = this.state.playerOne;
    return (
      <div className="screen">
        <div className="screen-switch">
          {map
            && (
            <div>
              <form className="screen-switch-map">
                <button
                  type="button"
                  className="screen-switch-map-button"
                  onClick={toggleScreen}
                >
              Switch to Board
                </button>
                <input
                  type="checkbox"
                  id="check"
                  className="screen-switch-map-checkbox"
                  onChange={this.handleGrid}
                  checked={grid}
                />
                <label
                  className="screen-switch-map-label"
                  htmlFor="check"
                >
              Quadrillage
                </label>
              </form>
              <div className="screen-switch-map-custom">
                {toggle
                && (
                <GithubPicker
                  class="screen-switch-map-custom-picker"
                  color={color}
                  width="170px"
                  onChangeComplete={this.handleChangeComplete}
                  triangle="hide"
                />
                )}
                <form className="screen-switch-map-custom-form" onSubmit={this.handleSubmit}>
                  <button
                    type="button"
                    style={{ backgroundColor: color }}
                    onClick={this.togglePicker}
                  >
                  &nbsp;
                  </button>
                  <input
                    className="screen-switch-map-custom-form-input"
                    type="text"
                    placeholder="Nom du personnage"
                    onChange={this.handleChange}
                    value={typingName}
                  />
                  <input
                    type="submit"
                    onClick={this.createPlayer}
                    value="+"
                  />

                </form>
              </div>
            </div>
            ) }
          {board
            && (
            <button
              type="button"
              className="screen-switch-button"
              onClick={toggleScreen}
            >
            Switch to Map
            </button>
            ) }
        </div>
        {map && (
        <div className="screen-map" onClick={moving ? this.displayPlayer : undefined}>
          {grid && <div className="screen-map-grid" onClick={moving ? this.displayPlayer : undefined} />}
          <img
            src="http://medievalshop.com/parchemin/wp-content/uploads/2013/08/La-prison.jpg"
            alt="map"
            className="screen-map-image"
          />
          {created && (
          <div
            className="screen-map-player"
            style={{
              position: 'absolute',
              left: `${coordX - 25}px`,
              top: `${coordY - 50}px`,
            }}
          >
            <span
              className="screen-map-player-nickname"
              style={{
                color,
              }}
            >{name}
            </span>
            <div
              className="screen-map-player-cursor"
              style={{
                backgroundColor: color,
              }}
            />
          </div>
          ) }

        </div>
        ) }
        {board && <div className="screen-board">THIS IS THE BOARD</div> }
      </div>
    );
  }
}

/**
 * Export
 */
export default GameScreen;
