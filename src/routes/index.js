import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import SignInForm from "../pages/SignInForm";
import Boards from "../pages/Boards";
import Details from '../pages/Details';
import Detailsbackup from '../pages/Detailsbackup';
import ProtectedRoute from "../components/ProtectedRoute";
import "../style/fontawesome/css/all.css";
import UnprotectedRoute from "../components/UnprotectedRoute";
import Confirm from "../pages/Confirm";
import ConfirmBanca from "../pages/confirmBanca";
import SignUpForm from "../pages/SignUpForm";
import Edit from '../pages/Edit';
import BancaDetailsById from "../pages/banca/BancaDetailsById";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/confirmBanca" element={<ConfirmBanca />}/>
        <Route path="/login" element={<UnprotectedRoute component={SignInForm} redirect="/boards"/>}/>
        <Route path="/signUp" element={<UnprotectedRoute component={SignUpForm} redirect="/boards"/>}/>

        {
        /*
        Lista das bancas
        */
        }
        <Route path="/boards" element={<ProtectedRoute component={Boards} redirect="/login"/>}/>
        

        {
        /*
        Detalhes da banca
        */
        }
        <Route path="/detailsbackup" element={<ProtectedRoute component={Detailsbackup} redirect="/login"/>}/>
        <Route path="/details" element={<ProtectedRoute component={Details} redirect="/login"/>}/>
        <Route path="/banca-details/:id" element={<ProtectedRoute component={BancaDetailsById} redirect="/login"/>}/>


        {
        /*
        edição da banca
        */
        }

        
        <Route path="/edit/:id" element={<ProtectedRoute component={Edit} redirect="/login"/>}/>

        {
        /*
        Confirmar inscrição na banca
        */
        }
        <Route path="/confirm" element={<UnprotectedRoute component={Confirm} redirect="/login"/>}/>
      </Routes>
    </BrowserRouter>
  )
}