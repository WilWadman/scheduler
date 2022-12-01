

export function getAppointmentsForDay(state, name) {
  //... returns an array of appointments for that day
  const filteredDays = state.days.filter(day => day.name === name);
  if(state.days.length === 0 || filteredDays.length === 0){
    return [];
  }


const appointmentsFromDays = filteredDays[0].appointments;
 
let filteredAppointments = [];

for(let appointment of appointmentsFromDays) {
  filteredAppointments.push(state.appointments[appointment]);
}
return filteredAppointments;
}