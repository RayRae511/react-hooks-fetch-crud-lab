import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import {fetch} from "whatwg-fetch"

function QuestionList() {
  const [question, setQuestion] = useState([])
  const Fetch = () => {
    fetch("https://localhost:3000/questions")
    .then((r) => r.json())
    .then((data)=> setQuestion(
      data.map((q) => {
        return (
          <QuestionItem 
            key={q.id}
            handleChange={handleChange}
            question={q}
            deleted={deleted}
          />
        )})
    ))
  }
  useEffect(()=> {
    Fetch()
  }, [])

  function deleted(id){
    fetch(`https://localhost:3000/questions/${id}`,{
      method: "DELETED",
    }).then(()=> Fetch())
  }

  function handleChange(e, id){
    fetch(`https://localhost:3000/questions/${id}`),{
      method: "PATCH",
      headers: {"content-type":"application/json"},
      body: JSON.stringify({
        correctIndex: parseInt(e.target.value),
      }),
    }
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questions}
      </ul>
    </section>
  );
}

export default QuestionList;
