

import {useState} from "react";

// Records the current view of an appointment and keeps a history of other modes
export default function useVisualMode(initial){

  const [mode, setMode] = useState(initial);
  const  [history, setHistory] = useState([initial]); 


 
  function transition(newMode, replace = false) {
    
    // if there is an error  this adds the new mode in the correct position
    if(replace){
      
      setHistory(prev =>[...prev.slice(0, prev.length), newMode]);
     
      }else{
        //  changes history to a copy of history with the new mode added
        setHistory(prev => [...prev, newMode]); 
        
      }
      setMode(newMode);
      return newMode
  }

 // function to revert to a previous history 
  function back() {
// creating a copy of the history to mutate
    let nextHistory = [...history];
    
    // removing the last mode item from the newly created nextHistory
    nextHistory.pop(mode);
    
    setHistory((prev) => nextHistory)
    
    // looks to see if the current history has at least 2 items in it
    if(history.length > 1) {
      // sets the mode to the second last history in the item
      setMode((prev) => nextHistory[history.length-2]);

    }
  }

  return { mode, transition, back};
}