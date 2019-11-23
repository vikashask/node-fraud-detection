import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

const TextFieldGroup = ({field, label,error, ...restProps}) => {
  const {className} = restProps;
  const combinedClasses = `form-control ${className}`;
    return (
        <div>
          <label className="control-label">{label}</label>
          <input
            name={field}
            {...restProps}
            className={combinedClasses}
          />
        {/* {error && <span className="help-block">{error}</span>} */}
        </div>  );
}

TextFieldGroup.prototype = {
    field:PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checkUserExists: PropTypes.func
}

TextFieldGroup.defaultProps = {
  type: 'text'
}
export default TextFieldGroup;
