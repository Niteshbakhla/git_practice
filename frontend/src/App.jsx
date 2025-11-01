import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Expense from './components/CreateExpense'
import ExpenseList from './pages/ExpenseList'
import AddExpense from './pages/AddExpense'
import EditPage from './pages/EditPage'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/expense' element={<AddExpense />} />
          <Route path='/expense-list' element={<ExpenseList />} />
          <Route path='/expense/:id' element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App