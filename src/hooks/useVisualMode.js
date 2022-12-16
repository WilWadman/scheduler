import { useState } from "react";

// Records the current view of an appointment and keeps a history of other modes
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    // if there is an error  this adds the new mode in the correct position
    if (!replace) {
  
      setHistory((prev) => [...prev, newMode]);
    }
    setMode(newMode);
  }

  // function to revert to a previous history
  function back() {
   

    if (history.length > 1) {
      // sets the mode to the second last history in the item

      setHistory((prev) => {
        let nextHistory = [...prev];
        nextHistory.pop(mode);
        setMode(nextHistory[nextHistory.length - 1]);
        return nextHistory;
      });
    }
  }

  return { mode, transition, back };
}
