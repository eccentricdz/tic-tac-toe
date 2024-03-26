import { HtmlHTMLAttributes } from "react";
import "./Button.css";

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  icon?: string;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  disabled = false,
  icon,
  children,
  ...props
}) => {
  return (
    <button
      className={`button ${variant} ${disabled ? "disabled" : ""}
      `}
      {...props}
    >
      {icon ? (
        <span className="material-symbols-outlined">{icon}</span>
      ) : (
        children
      )}
    </button>
  );
};
