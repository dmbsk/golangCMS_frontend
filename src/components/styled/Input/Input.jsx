import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      handleChange: this.props.handleChange,
      handleClick: this.props.handleClick,
    };

    this.DefaultHandleChange = this.DefaultHandleChange.bind(this)
  }

  DefaultHandleChange = (event) => {
    this.setState({value: event.target.value});
  };

  render() {
    const {
      text, type, id, placeHolder, disabled, name, value
    } = this.props;
    const {
      handleClick,
      handleChange,
    } = this.state;
    const compatibleTypes = ["", "text", "password"];
    const onChangeHandler = handleChange ? handleChange : this.DefaultHandleChange;
    const onClickHandler = handleClick ? handleClick : null;
    return (
      <div className="styled-input">
        <input
          name={name}
          type={type}
          className="form-control"
          id={id}
          value={value === '' ? this.state.value : value}
          onChange={onChangeHandler}
          placeholder={placeHolder}
          onClick = {onClickHandler}
          required
          disabled={disabled}
        />
        <label htmlFor={id}>{text}</label>
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  placeHolder: PropTypes.string,
  handleChange: PropTypes.func,
};

Input.defaultProps = {
  value: '',
  name: '',
  text: '',
  textInside: '',
  type: 'text',
  placeHolder: '',
  disabled: false,
  handleChange: null,
  handleClick: null,
};

export default Input;
