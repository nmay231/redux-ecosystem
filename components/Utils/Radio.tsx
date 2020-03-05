/** @format */

interface RadioProps {
    children: string
    name: string
    value: string | number
    select: [string | number, React.Dispatch<React.SetStateAction<string | number>>]
    inline?: boolean
}

const Radio: React.FC<RadioProps> = ({ name, children, value, select, inline }) => {
    const [selected, setSelected] = select
    return (
        <div className={`form-check${inline ? ' form-check-inline' : ''}`}>
            <input
                type="radio"
                name={name}
                id={`radio-${name}-${value}`}
                value={value}
                className="form-check-input"
                checked={value === selected}
                onChange={(e) => setSelected(e.target.value)}
            />
            <label htmlFor={`radio-${name}-${value}`} className="form-check-label">
                {children}
            </label>
        </div>
    )
}

export default Radio
