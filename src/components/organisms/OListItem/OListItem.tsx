import MListItem from '@molecules/MListItem/MListItem';
import { AVAILABLE_COLORS } from './../../../utils/general';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import { selectTodoById, todoColorSelected, todoDeleted, todoToggled } from 'store/todosSlice';

interface OListItemProps {
    id: string
}

interface Todo {
    text: string;
    completed: boolean;
    color: string
}

const OListItem: React.FC<OListItemProps> = ({ id }) => {
    const dispatch = useDispatch<AppDispatch>()

    const todo = useSelector((state: RootState) => selectTodoById(state, id))

    const { text, completed, color }: Todo = todo

    const handleCompletedChanged = () => dispatch(todoToggled(id))

    const handleColorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => dispatch(todoColorSelected(id, e.target.value))

    const handleDeleted = () => dispatch(todoDeleted(id))


    return (
        <MListItem
            text={text}
            isCompleted={completed}
            selectedItem={color}
            onCompletedChange={handleCompletedChanged}
            onItemChange={handleColorChanged}
            onDelete={handleDeleted}
            availableItems={AVAILABLE_COLORS}
            shouldShowActionButton
            shouldShowCheckbox
        />
    )
}

export default OListItem