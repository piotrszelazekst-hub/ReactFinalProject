import OFilters from "@organisms/OFilters/OFilters";
import OItemInut from "@organisms/OItemInput/OItemInput"
import OList from "@organisms/OList/OList";
import TActivity from "@templates/TActivity"
import React from "react"

const VTodo: React.FC = () => (
    <TActivity
        content={
            <>
                <OItemInut />
                <OList />

                <OFilters />
            </>
        }
    />
);

export default VTodo

//wchodzimy pod dany URL --> wywyoluje sie VTodo --> VTodo wywoluje tempalte +