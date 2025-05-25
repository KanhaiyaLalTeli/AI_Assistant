import React from 'react'

const AskQuestion = ({question,setQuestion,handleQuestion}) => {

    const isEnter = (e) => {
        if (e.key == "Enter") {
          handleQuestion();
        }
      };

  return (
    <div className="h-1/12 w-10/12 sm:w-1/2 mx-auto my-10">
          <div className="dark:bg-zinc-800 bg-red-100 pr-5  dark:text-white text-zinc-800 rounded-4xl border border-zinc-700  flex h-12 sm:h-16">
            <input
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(e) => isEnter(e)}
              className="w-full h-full p-2 outline-none"
              placeholder="Ask me anything"
            ></input>
            <button onClick={handleQuestion} className="cursor-pointer font-bold text-sm sm:text-base">
              Ask
            </button>
          </div>
        </div>
  )
}

export default AskQuestion
