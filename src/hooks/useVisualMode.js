

import {useState} from "react";

export default function useVisualMode(initial){

  const [mode, setMode] = useState(initial);
  const  [history, setHistory] = useState([initial]); 


 
  function transition(newMode, replace = false) {
    if(replace){
      //  use setHistory to slice off index 0 and the next index is there is one for a new array
      setHistory(prev => prev.slice(0, -1));
      // use state from last set and inject the newMode into a new array without altering the original
      setHistory(prev => [...prev, newMode]);
      }else{
        // use state from last set and inject the newMode into a new array without altering the original
        setHistory(prev => [...prev, newMode]); 
      }
      setMode(newMode);
  }

 
  function back() {
    if(history.length > 1) {
      setHistory(history.slice(0, -1));
      setMode(history[history.length-2]);
    }
  }

  return { mode, transition, back};
}