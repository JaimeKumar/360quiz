import { useEffect, useState } from 'react';
import './App.css';

export default function App() {

  const [questions, setQuestions] = useState([
    {
      q: "What is the capital of Australia?",
      options: ["Melbourne", "Canberra", "Sydney", "Perth"],
      correct: 1,
      a: null
    },
    {
      q: "What is the flying time between Abu Dhabi and Dubai?",
      options: ["1 Hour", "2 Hours", "There are no flights between Abu Dhabi and Dubai", "6 Hours"],
      correct: 0,
      a: null
    },
    {
      q: "To fly from London to Brisbane indirect which is the best connecting point from the below:",
      options: ["New York", "Johannesburg", "Singapore", "Glasgow"],
      correct: 2,
      a: null
    },
    {
      q: "When flying from Paris to Tokyo do you:",
      options: ["Arrive on the same day", "Arrive on the day before", "Arrive the next day", "Arrive 2 days later"],
      correct: 2,
      a: null
    },
    {
      q: "What is 'F' in the NATO phonetic alphabet?",
      options: ["France", "Freddie", "Foxtrot", "Flight"],
      correct: 2,
      a: null
    },
    {
      q: "What is 'Z' in the NATO phonetic alphabet?",
      options: ["Zebra", "Zulu", "Zanzibar", "Zoo"],
      correct: 1,
      a: null
    },
    {
      q: "In a fare & tax breakdown what tax code does YQ stand for?",
      options: ["UK Tax", "YQ is not a tax", "USA tax"],
      correct: 1,
      a: null
    },
    {
      q: "Which country does the Greenwich Meridien pass through?",
      options: ["Norway", "China", "France", "Suriname"],
      correct: 2,
      a: null
    },
    {
      q: "Which is these is a wide bodied jet?",
      options: ["Boeing 737 Max", "Airbus A380"],
      correct: 1,
      a: null
    },
    {
      q: "Which Airline Alliance does Royal Air Maroc belong to?",
      options: ["Skyteam", "Star Alliance", "Oneworld", "They don't belong to an alliance"],
      correct: 2,
      a: null
    },
    {
      q: "Which UK travel trade licence does NOT protect customers money for an airline ticket purchased through a travel agent?",
      options: ["ABTA", "IATA", "ATOL", "They all do"],
      correct: 1,
      a: null
    },
    {
      q: "A passenger purchased a roundtrip Business Class ticket LHR-CDG-LHR but only used the outbound, calculate the refund due to the passenger from the below fare information and fare rules:",
      extra: ["PURCHASED:", "Fare paid: £897.00", "Tax paid: £101.89", " ", "USED:", "Outbound leg £472.00", "Tax for outbound leg £51.89", " ", "FARE RULE:", "Cancellation charge £75 applies for any unused sector"],
      options: ["£350", "£400", "£450", "£650"],
      correct: 1,
      a: null
    }
  ])
  const [displayOptions, setOptions] = useState(null)
  const [pos, setPos] = useState(null)
  const [selected, setSelected] = useState(null)
  const [res, setRes] = useState(null)

  function submit(n) {
    let temp = [...questions]
    let ans = temp[pos].options.indexOf(displayOptions[selected]);
    temp[pos].a = ans;
    setQuestions(temp)
    setSelected(null)
    let newPos = pos+n;
    while (newPos < questions.length && questions[newPos].a === questions[newPos].correct) newPos++;
    if (newPos >= questions.length) {
      results()
    } else {
      setPos(p => newPos)
    }
  }

  function results() {
    let correct = 0;
    questions.forEach(q => {
      if (q.a === q.correct) {
        correct++;
      }
    })
    setRes(correct)
  }

  function retry() {
    setRes(null)
    let newPos = 0;
    while (questions[newPos].a === questions[newPos].correct) newPos++;
    if (newPos < questions.length) setPos(newPos)
  }

  function shuffleOptions(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    if (!(typeof pos === 'number')) return
    setOptions(shuffleOptions([...questions[pos].options]))
  }, [pos])

  return (
    <div className="App">
      {typeof res === 'number'?
      <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
        <b>Well done!</b>
        <span>You got {res} correct out of {questions.length}</span>
        {res < questions.length?
          <>
            <span>Click continue to retry the questions you got wrong</span>
            <div className="button" onClick={retry}>Continue</div>
          </>:''
        }
      </div>:
      !(displayOptions)?
        <div className="button" onClick={() => {setPos(0)}}>Start</div>:
        <div className="question">
          <b>Q{pos+1}:&nbsp;&nbsp;{questions[pos].q}</b>
          <br/>
          {questions[pos].extra?.map(x => {return <><br/>{x}</>})}
          <div className="options">
            {displayOptions.map((o,i)=>{
              return (
                <div className={`option${(selected === i)?' selected':''}`} onClick={()=>{setSelected(i)}}>
                  <p>{o}</p>
                </div>
              )
            })}
          </div>
          <div className="buttons">
            {/* <div className="button" onClick={() => {submit(-1)}}>&lt;</div> */}
            <div className={`button ${typeof selected !== 'number'?'grey':''}`} onClick={() => {if (typeof selected === 'number'){submit(1)}}}>Submit</div>
          </div>
        </div>
      }
    </div>
  );
}
