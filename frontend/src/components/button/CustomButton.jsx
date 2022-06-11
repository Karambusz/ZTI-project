import './CustomButton.scss';

const CustomButton = ({children, additionalClass, ...props}) => {
    return (
        <button className={`btn ${additionalClass}`} {...props}>
            {children}
        </button>
    )
}

export default CustomButton;