import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { getWeekday } from "@/utils/getWeekday";
import React, { RefObject, useEffect, useState } from "react";
import Select, { GroupBase, SelectInstance } from "react-select";
import { useSelector } from "react-redux";
import { visitTimeSelector } from "@/lib/slices/visitTimeSlice";
import compareLocaleDateSame from "@/utils/compareLocaleDate";

type Props = {
  date: Date;
  hour: number;
  ref: RefObject<SelectCompType | null>;
  selectAction: (
    selected: number,
    ref: RefObject<SelectCompType | null>
  ) => void;
};

export type OptionType = {
  hour: number;
  label: string;
};

export type SelectCompType = SelectInstance<
  OptionType,
  false,
  GroupBase<OptionType>
>;

const initOptionArray = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const labelStr = `${hour}시`;
  return { hour: hour, label: labelStr };
});

export default function VisitTimePicker({
  date,
  hour,
  ref,
  selectAction,
}: Props) {
  const [optionArray, setOptionArray] =
    useState<Array<OptionType>>(initOptionArray);
  const [selected, setSelected] = useState<OptionType | undefined>(
    optionArray[0]
  );

  useEffect(() => {
    const currentSelected = optionArray.find((option) => option.hour === hour);
    setSelected(currentSelected);
  }, [hour]);

  return (
    <div>
      <div>
        <p>
          {" "}
          {date.getMonth() + 1}월 {date.getDate()}일 {getWeekday(date)}
        </p>
      </div>
      <div className="z-10 relative">
        <Select
          ref={ref}
          options={optionArray}
          value={selected}
          menuShouldScrollIntoView={true}
          onChange={(selected: OptionType | null) => {
            if (selected) {
              selectAction(selected.hour, ref);
            }
          }}
          placeholder="시간을 선택하세요"
          isSearchable={false}
          styles={customStyles}
        ></Select>
      </div>
    </div>
  );
}

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: "white",
    borderColor: state.isFocused ? "#60a5fa" : "#d1d5db", // blue-400 or gray-300
    boxShadow: state.isFocused ? "0 0 0 1px #60a5fa" : "none",
    "&:hover": { borderColor: "#60a5fa" },
    padding: "0.25rem",
    minHeight: "2.5rem",
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "white",
    zIndex: 50, // Tailwind z-50
  }),
  option: (base: any, state: any) => {
    console.log(base);
    console.log(state);
    return {
      ...base,

      backgroundColor:
        state.selectProps.value.hour === state.data.hour
          ? "green"
          : state.isFocused
          ? "#f3f4f6"
          : "white", // gray-100
      color:
        state.selectProps.value.hour === state.data.hour ? "white" : "#111827", // gray-900
      padding: "0.5rem 0.75rem",
      cursor: "pointer",
    };
  },
  singleValue: (base: any) => ({
    ...base,
    color: "#111827", // gray-900
  }),
};
