import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const days = props.days;
  console.log("days",days)

  const DayListItems = days.map((days) =>

    <DayListItem
      key={days.id}
      name={days.name}
      spots={days.spots}
      selected={days.name === props.value}
      setDay={props.onChange} />

  );

  return (
    <ul>
      {DayListItems}
    </ul>
  );
}