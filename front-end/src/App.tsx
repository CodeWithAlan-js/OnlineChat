import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogPage from "./views/logPage";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LogPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
