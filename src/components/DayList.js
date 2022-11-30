import React from "react";
import DayListItems from "components/DayListItem";


export default function DayList(props) {
  const days = props.days;
  const DayListItem = days.map((days) =>

    <DayListItems
      key={days.id}
      name={days.name}
      spots={days.spots}
      setDay={props.setDay} />

  );

  return (
    <ul>
      {DayListItem}
    </ul>
  );
}