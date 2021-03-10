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
