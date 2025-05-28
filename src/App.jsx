import { useEffect, useRef, useState } from "react";
import { URL } from "./constant";
import RecentHistory from "./components/RecentHistory";
import Spinner from "./components/Spinner";
import QuestionAnswerDisplay from "./components/QuestionAnswerDisplay";
import AskQuestion from "./components/AskQuestion";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const [searchFromHistory, setSearchFromHistory] = useState("");
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);
  const [darkMode, setDarkMode] = useState("dark");

  const handleQuestion = async () => {
    if (!question && !searchFromHistory) {
      return false;
    }

    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history=history.slice(0,19);
        history = [question, ...history];
        history = history.map((item)=> item.charAt(0).toUpperCase()+item.slice(1).trim());
        history=[...new Set(history)];
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }

    const payloadData = question ? question : searchFromHistory;

    const payload = {
      contents: [
        {
          parts: [{ text: payloadData }],
        },
      ],
    };

    setLoader(true);
    setQuestion("");

    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    let dataString = data.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    setResult(prev => [
  ...prev,
  { type: "q", text: payloadData },
  { type: "a", text: dataString },
]);
    

    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);
    setLoader(false);
  };

  useEffect(() => {
    handleQuestion();
  }, [searchFromHistory]);

  useEffect(()=>{
    if(darkMode=='dark'){
      document.documentElement.classList.add('dark');
    }
    else{
      document.documentElement.classList.remove('dark');
    }
  },[darkMode])

  return (
    <div className={`${darkMode === 'dark' ? 'dark' : 'light'}`}>
    <div className="w-screen text-center flex h-screen">
      <div className="hidden sm:block w-2/12 dark:bg-zinc-800 bg-red-100 h-screen">
        <RecentHistory
          recentHistory={recentHistory}
          setSearchFromHistory={setSearchFromHistory}
          setRecentHistory={setRecentHistory}
        />
        <select
          className="fixed bottom-0 text-white left-0 bg-zinc-800 m-4"
          onChange={(e) => setDarkMode(e.target.value)}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>
      <div className="w-10/12 mx-auto">
        <div className="h-1/12">
          <h1 className="text-xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 p-1 font-bold">
            Hello User, Ask me Anything
          </h1>
          {loader ? <Spinner /> : null}
        </div>
        <QuestionAnswerDisplay scrollToAns={scrollToAns} result={result} />
        <AskQuestion
          question={question}
          setQuestion={setQuestion}
          handleQuestion={handleQuestion}
        />
      </div>
    </div>
    </div>
  );
}

export default App;
