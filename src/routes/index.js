import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import SignInForm from "../pages/SignInForm";
import Boards from "../pages/Boards";
import Details from '../pages/Details';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<SignInForm />} />
        <Route path="/boards" element={<Boards /> }/>
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  )
}