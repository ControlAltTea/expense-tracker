import { useState } from "react";

function ChatBar() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [visible, setVisble] = useState(false);

  const handleClick = async () => {
    console.log(JSON.stringify({ question: input }));

    try {
      const response = await fetch("/api/openAi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        console.log("error");
      }
      const responseData = await response.json();

      setMessages(messages.concat({ user: input, ai: responseData }));
    } catch (error) {
      console.error(error);
    }

    setInput("");
  };

  const toggleChat = () => {
    setVisble(!visible);
  };

  return (
    <>
      {visible ? (
        <div className="fixed bottom-16 right-4 w-96">
          <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b  bg-green-400 text-white rounded-t-lg flex justify-between items-center">
              <p className="text-lg font-semibold">AI Financial Assistant</p>
              <button onClick={toggleChat}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>{" "}
              </button>
            </div>
            <div className="flex flex-col-reverse p-4 h-80 overflow-y-auto border-2 black">
              <div>
                {messages.map((e) => (
                  <>
                    <div className="mb-3 text-right">
                      <p className=" bg-green-400 text-white rounded-lg py-2 px-4 inline-block">
                        {e.user}
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                        {e.ai}
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="p-4 border-t flex ">
              <input
                placeholder="Ask Your Financial AI"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleClick}
                className=" bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-r-md  transition duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 right-4 mb-4 mr-4">
          <button
            onClick={toggleChat}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Chat with Financial AI
          </button>
        </div>
      )}
    </>
  );
}

export default ChatBar;
