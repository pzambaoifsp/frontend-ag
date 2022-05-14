import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import SignInForm from "../pages/SignInForm";
import Boards from "../pages/Boards";
import Details from '../pages/Details';
import ProtectedRoute from "../components/ProtectedRoute";
import "../style/fontawesome/css/all.css";
import UnprotectedRoute from "../components/UnprotectedRoute";
import Confirm from "../pages/Confirm";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<UnprotectedRoute component={SignInForm} redirect="/boards"/>}/>
        <Route path="/boards" element={<ProtectedRoute component={Boards} redirect="/login"/>}/>
        <Route path="/details" element={<ProtectedRoute component={Details} redirect="/login"/>}/>
        <Route path="/confirm" element={<ProtectedRoute component={Confirm} redirect="/login"/>}/>
      </Routes>
    </BrowserRouter>
  )
}