import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {
  const InterviewerList = props.interviewers.map((interviewer) => {
   let isSelected = false
   
    if(props.value){
      isSelected = (interviewer.id === props.value.id)
    }

   return <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={isSelected}
      setInterviewer={() => {console.log("int id", interviewer.id); props.onChange(interviewer)}}
    />
});

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"> Interviewer</h4>
      <ul className="interviewers__list">{InterviewerList}</ul>
    </section>
  );
}
