import React, { useEffect, useState } from 'react';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import { checkHeading, replaceHeading } from '../helper';
import SyntaxHighlighter from 'react-syntax-highlighter';


const Answer = ({ ans, index, ansCount }) => {
  const [heading, setHeading] = useState(false);
  const [trimedHeading, setTrimedHeading] = useState('');

  useEffect(() => {
    if (typeof ans === 'string') {
      if (checkHeading(ans)) {
        setHeading(true);
        setTrimedHeading(replaceHeading(ans));
      } else {
        setTrimedHeading(ans);
      }
    } else {
      console.warn('Invalid ans value, expected string:', ans);
    }
  }, [ans]);

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
       
        <SyntaxHighlighter
          style={dark }
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
        
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="text-left sm:pl-5 sm:pr-5">
      {index === 0 && ansCount > 1 ? (
        <span className="font-bold pl-2">
          <ReactMarkdown components={components}>
            {String(trimedHeading)}
          </ReactMarkdown>
        </span>
      ) : heading ? (
        <span className="font-bold pl-2"> 
        <ReactMarkdown components={components}>
          {String(trimedHeading)}
          </ReactMarkdown></span>
      ) : (
        <span>
          <ReactMarkdown components={components}>
            {String(trimedHeading)}
          </ReactMarkdown>
        </span>
      )}
    </div>
  );
};

export default Answer;

