import React, {
  useState,
  SetStateAction,
  Dispatch,
  FunctionComponent,
} from "react";

type DefaultState = string | undefined;

const useDropdown: (
  label: string,
  defaultState: DefaultState,
  options: string[]
) => [string, FunctionComponent, Dispatch<SetStateAction<DefaultState>>] = (
  label: string,
  defaultState: DefaultState,
  options: string[]
) => {
  const [state, updateState]: [
    DefaultState,
    Dispatch<SetStateAction<DefaultState>>
  ] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const Dropdown: FunctionComponent = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={state}
        onChange={(e) => updateState(e.target.value)}
        onBlur={(e) => updateState(e.target.value)}
        disabled={!options.length}
      >
        <option />
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
  return [state, Dropdown, updateState];
};

export default useDropdown;
