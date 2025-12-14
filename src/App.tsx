import React from "react";
import VTodo from "@views/VTodo"

const App: React.FC = () => {
  return <VTodo />
};

export default App;

/*import AButton from "@atoms/AButton/AButton";
import ACheckbox from "@atoms/ACheckbox/ACheckbox";
import AColorDot from "@atoms/AColorDot/AColorDot";
import AInput from "@atoms/AInput/AInput";
import ALoader from "@atoms/ALoader/ALoader";
import ASelect from "@atoms/ASelect/ASelect";
import AText from "@atoms/AText/AText";


import MListItem from "@molecules/MListItem/MListItem";
import MSection from "@molecules/MSection/MSection";
import AButton from "@atoms/AButton/AButton";


import React, { useState } from "react";
import { AVAILABLE_COLORS } from "@utils/general";
import MColorFitler from "@molecules/MColorFilter/MColorFilter";
*/
/*
  const options = [
    { value: "0", label: "" },
    { value: "1", label: "Green" },
    { value: "2", label: "Yellow" },
    { value: "3", label: "Red" },
  ];

  const [selected, setSelected] = useState<string | number>("")
  return (
    <>
      <AButton onClick={() => alert("Super")} >Moj pierwszy button</AButton>
      <AButton type="secondary">Super</AButton>
      <AButton isLoading>Loading</AButton>
      <AButton isDisabled>Disabled</AButton>
      <AButton isDisabled isLoading> Loading and disabled</AButton>


      <ACheckbox isChecked={false} />
      <ACheckbox isChecked />

      <AColorDot size="large" color="orange" />
      <AColorDot size="small" color="red" />
      <AInput />
      <AInput placeholder='Podaj swój' />

      <ALoader />
      <AText tag="h2" text="Dzisaij jest sds" />
      <AText tag="p" text="Jutro pn" />
      <ASelect
        value={selected}
        options={options}
        onChange={(e) => setSelected(e.target.value)}
      />
    </>



    )
     type TodoListItem = {
    id: number;
    text: string;
    isCompleted: boolean;
    selectedItem: string;
  };

  const availableItems = ['green', 'blue', 'red'];

  const [items, setItems] = useState<TodoListItem[]>([
    { id: 1, text: 'Buy milk', isCompleted: false, selectedItem: '' },
    { id: 2, text: 'Walk the dog', isCompleted: false, selectedItem: 'green' },
    { id: 3, text: 'Learn React', isCompleted: false, selectedItem: 'blue' },
  ]);

  const updateItem = (id: number, patch: Partial<TodoListItem>) => {
    setItems((previousItems) => previousItems.map((item) => item.id === id ? { ...item, ...patch } : item));
  };

  const handleCompletedChange = (id: number, isChecked: boolean) => {
    updateItem(id, { isCompleted: isChecked })
  }

  const handleItemChange = (id: number, value: string) => {
    updateItem(id, { selectedItem: value });
  }

  const handleDelete = (id: number) => {
    setItems((previousItems) => previousItems.filter((item) => item.id !== id));
  }

  const listItem = items.map((item) => (
    <MListItem
      key={item.id}
      text={item.text}
      isCompleted={item.isCompleted}
      selectedItem={item.selectedItem}
      availableItems={availableItems}
      shouldShowCheckbox
      shouldShowActionButton
      onCompletedChange={(e) => handleCompletedChange(item.id, e.target.checked)}
      onItemChange={(e) => handleItemChange(item.id, e.target.value)}
      onDelete={() => handleDelete(item.id)}
    />
  ));
  return <>{listItem}</>;


  <MSection style={{ width: '500px' }} title="Przykladowa sekcja">
      <AButton type="secondary">Przykladowy button</AButton>
    </MSection>


     <MColorFitler
      availableColors={AVAILABLE_COLORS}
      selectedColors={selectedColors}
      onColorChange={handleColorChange}

    />
    const [selectedColors, setSelectedColors] = useState<string[]>(['red']);

  const handleColorChange = (color: string, action: 'added' | 'removed') => {
    const selectedColorsAfterChange =
      action === 'removed'
        ? selectedColors.filter((selectedColor) => selectedColor !== color)
        : [...selectedColors, color];

    setSelectedColors(selectedColorsAfterChange);
  };
  <MStatusFilter
      selectedStatus={selectedStatus}
      statusOptions={[
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
      ]}
      onStatusChange={(status) => setSelectedStatus(status)}
    />);
     const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'completed'>('active');
*/



