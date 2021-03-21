/**
 * input field component which receives 3 parameters
 * 1 the name of the field
 * 2 the label for the field
 * 3 span for errors by the field
 * 4 more option for select field
 */
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group text-center">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />
      {/*errors*/}
      <span className="text-danger">{error}</span>
    </div>
  );
};

export default Input;
