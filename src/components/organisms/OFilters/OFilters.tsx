import AButton from "@atoms/AButton/AButton";
import AText from "@atoms/AText/AText";
import MColorFitler from "@molecules/MColorFilter/MColorFilter";
import MSection from "@molecules/MSection/MSection";
import MStatusFilter from "@molecules/MStatusFilter/MStatusFilter";
import { colorFilterChanged, StatusFilter, statusFilterChanged, statusFilters, } from "./../../../store/filterSlice";
import { AppDispatch, RootState } from "./../../../store/store"
import { allTodosCompleted, completedTodosCleared, selectTodos } from './../../../store/todosSlice';
import { AVAILABLE_COLORS } from "@utils/general";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import './OFilters.scss'


const OFilters: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleMarkAllCompleted = () => dispatch(allTodosCompleted());

    const handleClearCompleted = () => dispatch(completedTodosCleared());

    const handleStatusChange = (status: StatusFilter) => dispatch(statusFilterChanged(status));

    const handleColorChange = (color: string, action: 'added' | 'removed') => dispatch(colorFilterChanged(color, action));

    const todosRemaining = useSelector((state: RootState) => {
        const incompletedTodos = selectTodos(state).filter(todo => !todo.completed)
        return incompletedTodos.length
    })

    const { status, colors } = useSelector((state: RootState) => state.filters)

    const statusOptions = (Object.keys(statusFilters) as Array<keyof typeof statusFilters>).map(
        (label) => ({
            value: statusFilters[label],
            label
        })
    )



    return (
        <div className="o-filters">
            <div className="o-filters__actions">
                <MSection title="Actions">
                    <div className="action_button">
                        <AButton onClick={handleMarkAllCompleted}>Mark All Completed</AButton>
                        <AButton onClick={handleClearCompleted}>Clear Completed</AButton>
                    </div>
                </MSection>
            </div>
            <div className="o-filters__filters">
                <MSection title='Remaining Todos'>
                    <AText className="o-filters__remaining-todos" text={`${todosRemaining} items left`} tag="p" />
                </MSection>

                <MStatusFilter
                    statusOptions={statusOptions}
                    selectedStatus={status}
                    onStatusChange={handleStatusChange}
                />

                <MColorFitler
                    availableColors={AVAILABLE_COLORS}
                    selectedColors={colors}
                    onColorChange={handleColorChange}
                />
            </div>
        </div>
    )

}
export default OFilters