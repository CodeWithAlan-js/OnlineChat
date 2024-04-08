import LogPage from "./views/logPage"
import { UserProvider } from "./context/userContext"

function App() {

  return (
    <>
      <UserProvider>
      <LogPage />
      </UserProvider>
    </>
  )
}

export default App
