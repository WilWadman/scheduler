it("should navigate to Tuesday", () => {
  cy.visit("/");

  cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
});

// Booking
// The plan for testing the booking of an interview is more manageable.

// Visits the root of our web server
// Clicks on the "Add" button in the second appointment
// Enters their name
// Chooses an interviewer
// Clicks the save button
// Sees the booked appointment
// Editing
// If we edit the existing appointment booked for "Archie Cohen", then we don't need to create an appointment first.

// Visits the root of our web server
// Clicks the edit button for the existing appointment
// Changes the name and interviewer
// Clicks the save button
// Sees the edit to the appointment
// Canceling
// We can also perform a test to cancel an existing interview. It is for this reason that we need to reset the database after each test. If one test cancels and interview and the next test expects that interview to exist, then our tests can break for reasons unrelated to our code quality.

// Visits the root of our web server
// Clicks the delete button for the existing appointment
// Clicks the confirm button
// Sees that the appointment slot is empty