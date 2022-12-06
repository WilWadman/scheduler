import React, { useState } from "react";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList.js";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const reset = function() {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = function() {
    reset();
    props.onCancel();
  };
  const saveForm = function() {
    validate()
    
  };


  function validate() {
  
    if (student === "") {
    
      setError(()=> "student name cannot be blank" );

      return;
    }
   
    
  
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            value={props.value}
            onChange={(event) => { setStudent(event.target.value); }}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >
            Cancel
          </Button>
          <Button confirm onClick={saveForm}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
