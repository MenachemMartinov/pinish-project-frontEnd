// const Option = ({ option }) => {
//   return <option value={option.value}>{option.name}</option>;
// };

//   handleChange(event) {
//     this.setState({ value: event.target.value }, () => console.log);
//     console.log(this.state);
//   }

const Select = (props) => {
  const { name, label, error, value, option, state, ...rest } = props;
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
