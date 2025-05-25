import React from 'react'

const Question = ({ans}) => {
  return (
    <div className="text-left">         
            <span className="text-lg pl-1">            
               {ans}            
            </span>
         
        </div>
      );
  
}

export default Question;
