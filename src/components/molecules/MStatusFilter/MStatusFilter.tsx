import AButton from "@atoms/AButton/AButton";
import React from "react";
import MSection from "@molecules/MSection/MSection";
import "./MStatusFilter.scss"


type StatusValue = 'all' | 'active' | 'completed'
type StatusLabel = Capitalize<StatusValue> // stworzy unie All Active Completed

interface StatusOption {
    value: StatusValue;
    label: StatusLabel;
}

interface MStatusFilterProps {
    selectedStatus: StatusValue;
    statusOptions: StatusOption[];
    onStatusChange: (status: StatusValue) => void;
}

const MStatusFilter: React.FC<MStatusFilterProps> = ({
    selectedStatus,
    statusOptions,
    onStatusChange
}) => {
    const renderedFilterButtons = statusOptions.map((option) => {

        return (
            <div key={option.value} className="m-status-filter__item">
                <AButton
                    isDisabled={selectedStatus === option.value}
                    className={"m-status-filter__button"}
                    onClick={() => onStatusChange(option.value)}
                >
                    {option.label}
                </AButton>
            </div>
        );
    });

    return (
        <MSection title="Filter by Status">
            <div className="m-status__filter">{renderedFilterButtons}</div>
        </MSection>
    );
};

export default MStatusFilter;

//1. Definicja interfejsu dla propsow

//2. a) SelectedStatus type statusValue np 'active' --< selectedStatus = 'active'
//b) statusOptions typu StatusOption []
// c) onStatusChange --> (status: StatusValue)

//.2 Stworzenie komponentu o nazawie MStatusFilter

//3.Destrukturyzacja propsow

//.4 JXS wynikowy na zwracac
//a) MSection z tytulem "Filter by Status" oraz konentem ktory zawiera liste stausow'


//5. Lista statusow definiujemy w zmiennej const renderofFilterButtons
//wewntz reeredFilterButtons .map i dla kazdego selectedStatus tworzymy sobie element JSX
//kazdy element jsx ma zawierac atom: ABUttoon

//<div key={??} className="??">
// <AButton x>lablkii</AButton>
//</div>


//6Finalnie to co jest w renderedFilterButtons wrzucamy jako children do <MSection ... </MSection>