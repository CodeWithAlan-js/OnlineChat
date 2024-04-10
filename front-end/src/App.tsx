import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogPage from "./views/logPage";
import { UserProvider } from "./context/userContext";
import { io, Socket } from "socket.io-client";
import ChatPage from "./views/chatPage";

const socket: Socket = io("http://localhost:3000");


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LogPage socket={socket} />} />
          <Route path="/chat" element={<ChatPage socket={socket} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
