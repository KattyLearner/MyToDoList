import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType ={
    addItem: (value: string) => void
}

function AddItemForm (props: AddItemFormPropsType){
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>)=>{setValue(e.currentTarget.value)}
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {onClickAdd()}}
    const onClickAdd = () => {
        if (value.trim() !== '') {
            props.addItem(value.trim())
            setValue('')}
        else {
            setError('Field is required')
        }
    }
    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={value}
                onChange={onChangeInputValue}
                onKeyPress={onKeyPressAddTask}/>
            <button onClick={onClickAdd}>+</button>
            <div className={error ? 'error-message' : ''}>{error}</div>
        </div>
    )
}

export default AddItemForm