import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './authentications/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from './authentications/Login'
import Forgetpass from './authentications/Forgetpass'
import Newpass from './authentications/Newpass'
const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
<BrowserRouter>
<Routes>

  <Route path='/' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/forgetpass' element={<Forgetpass/>}/>
  <Route path='/newpassword' element={<Newpass/>}/>

</Routes>
</BrowserRouter> 
</QueryClientProvider>
 )
}

export default App
