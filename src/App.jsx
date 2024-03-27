import { Route, Routes } from "react-router-dom";
import Home from "./pages/News/News"
import OneNews from './pages/New/New'
function App() {


  return (
    <div >
    <Routes>
      <Route path="*" element={<Home/>}/>
      <Route index element={<Home/>}/>
      <Route path ="/:id" element={<OneNews/>}/>
    </Routes>
    </div>
  )
}

export default App
