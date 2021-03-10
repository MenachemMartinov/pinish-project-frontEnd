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
      <span className="text-danger">{error}</span>
    </div>
  );
};

export default Input;
