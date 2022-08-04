import { useState } from 'react';
import DatGui, { DatBoolean, DatButton, DatColor, DatFolder, DatNumber, DatPresets, DatSelect, DatString } from '@tim-soft/react-dat-gui';

function DacchiWife({ onChange }) {
  const parameter = {
    string: 'Hello World',
    minMaxNumber: 66,
    number: 80,
    boolean: true,
    select: 'one',
    color: '#2FA1D6',
    random: Math.random(),
    nested: {
      string: 'Goodbye Cruel World',
    },
  };
  const [initialData, setInitialData] = useState({
    data: parameter,
    defaultData: parameter,
  });

  const handleButtonClick = (e) => {
    console.log(e);
  };

  // Update current state with changes from controls
  const handleUpdate = (newData) => {
    setInitialData((prevState) => ({
      data: { ...prevState.data, ...newData },
    }));
    onChange(initialData.data);
  };

  const presets = [
    // Preset A doesn't extend any other presets
    {
      A: {
        string: 'Preset A',
        minMaxNumber: 33,
        number: 40,
        boolean: false,
        select: 'one',
        color: '#e61d5f',
        random: Math.random(),
        nested: {
          string: 'Nested Preset A',
        },
      },
    },
    // Preset B doesn't extend any other presets
    {
      B: {
        string: 'Preset B',
        minMaxNumber: 12,
        number: 68,
        boolean: true,
        select: 'three',
        color: '#2FD654',
        random: Math.random(),
        nested: {
          string: 'Nested Preset B',
        },
      },
    },
    // Preset C extends the default preset
    { 'C (extends Default)': { ...initialData.defaultData, string: 'Preset C' } },
    // Preset D extends the current state
    { 'D (extends current state)': { ...initialData.data, string: 'Preset D' } },
  ];

  return (
    <main className="react-dat-gui-demo">
      <DatGui data={initialData.data} onUpdate={handleUpdate} className="react-dat-gui-fixed-position">
        <DatPresets label="Presets" options={presets} onUpdate={handleUpdate} />
        <DatString path="string" label="String" />
        <DatNumber path="minMaxNumber" label="Number" min={0} max={100} step={1} />
        <DatNumber path="number" label="Number" />
        <DatBoolean path="boolean" label="Boolean" />
        <DatButton label="Button" onClick={handleButtonClick} />
        <DatSelect label="Select" path="select" options={['two', 'three', 'four']} />
        <DatColor label="Color" path="color" />
        <DatFolder title="Folder">
          <DatString path="string" label="String" />
          <DatNumber path="minMaxNumber" label="Number" min={0} max={100} step={1} />
          <DatFolder title="Nested Folder">
            <DatNumber path="minMaxNumber" label="Number" min={0} max={100} step={1} />
            <DatString path="nested.string" label="String" />
            <DatFolder title="Another Nested Folder">
              <DatColor label="Color" path="color" />
              <DatString path="nested.string" label="Nested String" />
            </DatFolder>
          </DatFolder>
        </DatFolder>
      </DatGui>
    </main>
  );
}

export { DacchiWife };
