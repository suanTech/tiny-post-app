import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string,
  disabled?: boolean;
}
export default function Button({className, children, ...rest}: ButtonProps) {
  return (
    <button className={className} {...rest}>{children}</button>
  )
}
