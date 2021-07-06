import './index.css';

export interface IFormItemProps {
    name: string
    label: string
    type: 'text' | 'number' | 'select'
    options?: Array<string>
    onChange?: (value: string | number) => void
    error?: string
}

export interface IFormProps {
    items: Array<IFormItemProps>
}

const Form = (props: IFormProps) => {
    
    const { items } = props

    const renderInput = (item: IFormItemProps) => {
        const { type, name, options, onChange } = item
        switch (type) {
            case 'select': 
                return (<select name={name} onChange={(e) => onChange && onChange(e.target.value)}>
                    {
                        [``, ...(options || [])].map((o) => <option key={o} value={o}>{o}</option>)
                    }
                </select>)
            default: 
                return (<input name={name} type={type} onChange={(e) => onChange && onChange(e.target.value)} min={0} />)
        }
    }
    return (
        <div className='form'>
            {
                items.map((i) => {
                    return (
                        <div key={i.name} className={`form-item ${i.error ? 'form-item--has-error' : ''}`}>
                            <label>{i.label}</label>
                            {renderInput(i)}
                            {
                                i.error && <span className='form-item__error'>{i.error}</span>
                            }
                        </div>
                    )
                })
            }
        </div>
        
    );
}

export default Form;
