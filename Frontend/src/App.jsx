import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import Newcomp from "./newcomp"

const App = () =>{


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Newcomp/>} >

          </Route>
        </Routes>
      </Router>
    </>
  )

}
export default App
