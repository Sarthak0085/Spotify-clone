/* eslint-disable react/prop-types */
const CustomInput = ({ ...props }) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {props.label && <label htmlFor="input-field" className="font-semibold">{props.label}</label>}
      <input
        id="input-field"
        type={props.text}
        placeholder={props.placeholder}
        name="input-field"
        className={`p-3 border border-gray-300 border-solid rounded placeholder-gray-500`}
      />
    </div>
  )
}

export default CustomInput;