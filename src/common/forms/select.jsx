/**
 * select field component which receives 5 parameters
 * 1 the name of the field
 * 2 the label for the field
 * 3 span for errors by the field
 * 4 the value of the field
 * 5 the option for the selected field
 * 6 more option for select field
 */

const Select = (props) => {
  const { name, label, error, value, option, ...rest } = props;
  return (
    <div className="form-group text-center">
      <label htmlFor={name}>{label}</label>
      <select
        {...rest}
        name={name}
        id={name}
        defaultValue={value}
        className="form-control"
      >
        <option value="" disabled>
          {label}
        </option>

        {option.map((option) => (
          <option key={option._id} value={option.categoryName}>
            {option.categoryName}
          </option>
        ))}
      </select>
      <span className="text-danger">{error}</span>
    </div>
  );
};

export default Select;
