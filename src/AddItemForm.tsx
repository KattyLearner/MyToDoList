import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

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
            <TextField variant={"outlined"} label={'Type task title'}
                error ={!!error}
                value={value}
               helperText={error}
                onChange={onChangeInputValue}
                onKeyPress={onKeyPressAddTask}/>

            <IconButton onClick={onClickAdd} color={"primary"}>
                <ControlPoint/>
            </IconButton>
            {/*<div className={error ? 'error-message' : ''}>{error}</div>*/}
        </div>
    )
}

export default AddItemForm