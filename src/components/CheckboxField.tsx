interface CheckboxFieldProps {
  label: string,
  id: string
}

function CheckboxField({ label, id, ...restProps }: CheckboxFieldProps) {
  return (
   <>
    <input
      type="checkbox"
      name={id}
      id={id}
      className="form-checkbox"
      {...restProps}
    />
    <label htmlFor="billing_same" className="ml-2">
      {label}
    </label>
   </>
  )
}

export default CheckboxField