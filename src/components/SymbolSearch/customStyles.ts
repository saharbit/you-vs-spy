export const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#131315",
  }),
  option: (provided: any, state: { isFocused: Boolean }) => ({
    ...provided,
    color: "white",
    backgroundColor: state.isFocused ? "#2d3134" : "#131315",
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "14px 20px",
  }),
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#131315",
    border: "none",
    boxShadow: "none",
    borderRadius: "20px",
  }),
  indicatorsContainer: () => ({ display: "none" }),
  indicatorSeparator: () => ({ display: "none" }),
  input: (provided: any) => ({ ...provided, color: "white" }),
};
