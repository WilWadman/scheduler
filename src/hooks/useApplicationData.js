import { useState, useEffect } from "react";
import axios from "axios";

// Use application data function export

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // find the day function takes in the day variable and returns the index associated with that day of the week

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

  // Setting a new state with data pulled from the api rather than mutating the initial state

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
        interviewers: all[2].data,
      }));
    });
  }, []);

  // SetDay functionality takes in a copy of the state with the day added
  const setDay = (day) => setState({ ...state, day });
  /* Book interview functionality  takes in the id and interview then creates a new copy of state, 
  updates it and merges it into the current state to update the booked interview */
  const bookInterview = function (id, interview) {
    console.log( "ID", id , "INTERVIEW", interview)
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
  
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots,
      };
    }

    let days = [...state.days];
    days[dayOfWeek] = day;
// Put request sent to the api and then a new state is set with a copy of state being mergedvas the current state
    return axios.put(`/api/appointments/${id}`, { interview}).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  /* Cancel interview functionality  takes in the id of the interview then creates a new copy of state, 
  updates it and merges it into the current state to update the canceled interview */

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
// Delete request sent to the api and then a new state is set with a copy of state being mergedvas the current state
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days,
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
