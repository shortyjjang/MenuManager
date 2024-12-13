
import { collapseTailwindClassName } from "@/util/collapseTailwindClassName";
import { forwardRef, useId } from "react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  rounded?: boolean;
}

const Radiobox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label = "",
      checked = false,
      onChange,
      rounded = true,
      ...props
    }: CheckboxProps,
    ref
  ) => {
    const id = useId()
    return (
      <div className={collapseTailwindClassName(['inline-flex items-center gap-2'])}>
        <span className={collapseTailwindClassName(["relative w-[16px] h-[16px] text-white flex items-center justify-center", rounded ? 'rounded-full' : 'rounded-sm', checked ? 'bg-primary' : 'bg-white border border-gray-300'])}>
          <span className={collapseTailwindClassName(['w-[8px] h-[8px] rounded-full', checked ? 'bg-white' : 'bg-transparent'])}></span>
          <input
            type="checkbox"
            id={id}
            checked={checked}
            className="absolute top-0 left-0 w-full h-full opacity-0"
            ref={ref}
            {...props}
            onChange={(e) => {
              onChange?.(e.target.checked)
            }}
          />
        </span>
        {label && <label htmlFor={id} >{label}</label>}
      </div>
    );
  }
);

Radiobox.displayName = "Radiobox";
export default Radiobox;