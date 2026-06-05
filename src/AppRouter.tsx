import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Test from './components/admin/test'

const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/test' element={<Test/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter