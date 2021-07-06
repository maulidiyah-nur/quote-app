import './index.css';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: IButtonProps) => {
    return (
        <button {...props} className='button' />
    );
}

export default Button;
