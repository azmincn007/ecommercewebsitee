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
import Loading from './components/Loading/Loading'
import Landing from './pages/Landing'
import Searchpage from './pages/Searchpage'
import MobileNavbar from './pages/MobileNavbar'
const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
<BrowserRouter>
<Routes>
<Route path='/' element={<Landing/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/forgetpass' element={<Forgetpass/>}/>
  <Route path='/newpassword' element={<Newpass/>}/>
  <Route path='/load' element={<Loading/>}/>
  <Route path='/searchpage' element={<Searchpage/>}/>
  <Route path='/mobilenav' element={<MobileNavbar/>}/>

  


</Routes>
</BrowserRouter> 
</QueryClientProvider>
 )
}

export default App
