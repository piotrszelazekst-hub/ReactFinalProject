import AInput from "@atoms/AInput/AInput";
import { AppDispatch } from "./../../../store/store"//"@store/store"
import { useState } from "react";
import { useDispatch } from "react-redux"
import React from "react";
import AButton from "@atoms/AButton/AButton";
import { saveNewTodo } from "./../../../store/todosSlice"//"@store/todosSlice";
import './OItemInput.scss'

const OItemInput: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [text, setText] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)

    const handleAddTodo = async () => {
        const trimmedText = text.trim()

        if (!trimmedText) {
            return; //early exit
        }

        setIsLoading(true);

        try {
            await dispatch(saveNewTodo(trimmedText))
            setText('')
        } catch (error) {
            console.error('Failed to save the todo', error)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="o-item-input">
            <AInput
                className="o-item-input__input"
                placeholder="What need to be done?"
                value={text}
                onChange={handleChange}
                isDisabled={isLoading}
            />
            <AButton
                className="o-item-input__button"
                onClick={handleAddTodo}
                isDisabled={isLoading}
                isLoading={isLoading}
            >
                Add
            </AButton>
        </div>
    )
}

export default OItemInput