import ALoader from "@atoms/ALoader/ALoader";
import MList from "@molecules/MList/MList";
import OListItem from "@organisms/OListItem/OListItem";
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "store/store"
import { fetchTodos, selectFilteredTodoIds } from "store/todosSlice";
import './OList.tsx'

const OList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const todoIds = useSelector((state: RootState) => selectFilteredTodoIds(state));

    const loadingStatus = useSelector((state: RootState) => state.todos.status)

    const error = useSelector((state: RootState) => state.todos.error)


    //Pobieramy liste todos z be
    // UseEffect - hook ktory uruchamia Po renderze z komponentu

    useEffect(() => {
        if (loadingStatus === 'idle') {
            dispatch(fetchTodos())
        }
    }, [loadingStatus, dispatch])


    if (loadingStatus === 'loading') {
        return (
            <div className="o-list">
                <ALoader />
            </div>
        )
    }

    if (loadingStatus === 'failed') {
        return (
            <div className="o-list">
                <div className="o-list__error">Error: {error}</div>
            </div>
        )
    }

    const renderedTodoItems = todoIds.map((todoId: string) => <OListItem key={todoId} id={todoId} />)

    return <MList items={renderedTodoItems} />
}

export default OList