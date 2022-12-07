import React, { useState, useEffect } from "react";
import axios from "axios";

// Use application data function export

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  // find the day function takes in the day variable and returns the key value associated with that day of the week

  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };
    return daysOfWeek[day];
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers:all[2].data,
      }));
    });
  },[]);

 
    // SetDay functionality
  const setDay = (day) => setState({ ...state, day });
 // Book interview functionality
  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // Setting the day of the week to today
    const dayOfWeek = findDay(state.day);

    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek],
    };
    // if there is an appointment added at this ID  reduce the spots count by 1
    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1,
      };
    } else {
      //
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots,
      };
    }

    let days = [...state.days];
    days[dayOfWeek] = day;

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        // add the days value to our setstate to update
        days
      });
    });
  };

  // Cancel interview functionality

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // Setting the day of the week to today
    const dayOfWeek = findDay(state.day);

    // if there is not an appointment added at this ID grow the spots count by 1
    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1,
    };

    let days = [...state.days];
    days[dayOfWeek] = day;
console.log(state.days[dayOfWeek].spots)
console.log(dayOfWeek)
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        // add the days value to our setstate to update
        days
      });
    });
  };

  // return an object with our functions
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
