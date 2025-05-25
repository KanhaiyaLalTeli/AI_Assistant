import React from 'react'
import Answer from './Answer'
import Question from './Question';

const QuestionAnswerDisplay = ({scrollToAns,result}) => {
  return (
       <div
          ref={scrollToAns}
          className="h-8/12 overflow-scroll hide-scrollbar"
        >
          <div className="text-white p-2">
            <ul>
              {result.map((item, index) => (
                <div
                  key={index}
                  className={item.type == "q" ? "flex justify-end mt-5" : ""}
                >
                  {item.type == "q" ? (
                    <li className="dark:bg-zinc-700 bg-red-100 border-8 dark:border-zinc-700 border-red-100 dark:text-zinc-200 text-zinc-600 w-fit text-left rounded-bl-3xl rounded-br-3xl rounded-tl-3xl">
                      <Question
                        ans={item.text}
                      />
                    </li>
                  ) : (
                    item.text.map((ansItem, ansIndex) => (
                      <li key={ansIndex} className='dark:text-zinc-200  text-zinc-600 '>
                        <Answer
                          ans={ansItem}
                          index={ansIndex}
                          ansCount={item.text.length}
                        />
                      </li>
                    ))
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
  )
}

export default QuestionAnswerDisplay;

