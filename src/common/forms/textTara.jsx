/**
 * textTara field component which receives 3 parameters
 * 1 the name of the field
 * 2 the rows for the field
 * 3 the placeholder for the field
 * 4 more option for select field
 */

const TextTara = ({ name, rows, placeholder, ...rest }) => {
  return (
    <textarea
      className="form-control"
      {...rest}
      name={name}
      rows={rows}
      placeholder={placeholder}
    ></textarea>
  );
};

export default TextTara;
