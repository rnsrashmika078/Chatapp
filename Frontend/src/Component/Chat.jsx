import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import './chat.css';
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const recData = location.state;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [arrayuserId, setarrayUserId] = useState([]); // Initialize as an array
  const [data, setData] = useState({
    dp: '',
    username: ''
  });

  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [connectUser, setConnectUser] = useState(false);

  useEffect(() => { 
   
    const newSocket = io("https://chatapp-server-pink-three.vercel.app/", {
      transports: ["websocket"], // Ensures WebSocket is used
      withCredentials: true,    // Allows cookies and credentials
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
      setConnectUser(true);
      setUserId(newSocket.id);
      setarrayUserId((prevArray) => [...prevArray, newSocket.id]);
    });

    newSocket.on("message", (msg) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    newSocket.on("disconnect", () => {
      setConnectUser(false);
      console.log("Disconnected from server");
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (recData) {
      setData(recData); // Initialize data state from recData
    }
  }, [recData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket && userId) {
      socket.emit("message", {
        userId,
        user: data.username,
        dp: data.dp,
        text: message,
      });
      setMessage(""); // Clear input field
    } else {
      console.error("Socket not connected or user ID not set");
    }
  };

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ul className="chat-body">
        <p className="header-username">PRIVATE CHAT</p>
        {arrayuserId.map((id, index) => (
          <li style={{ fontSize: '15px', marginTop: '20px', color: 'white', backgroundColor: 'red', marginRight: '200px' }} key={index}>
            {connectUser ? "You are Connected: " + id : "Disconnected"}
          </li>
        ))}
        {messages.map((msg, index) => (
          <li key={index} ref={bottomRef} className={msg.userId === userId ? "sent-message" : "received-message"}>
            <div className="messagebody">
              <img className="img" src={msg.dp} alt="dp" />
              <p className="sendername">{msg.user}</p>: <p className="message">{msg.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="area">
          <input
            className="field"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
