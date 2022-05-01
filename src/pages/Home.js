import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate()

  const handleGoToLogin = () => {
    navigate('/login');
  }

  return (
    <button onClick={handleGoToLogin}>Realizar login</button>
  )
}

export default Home;
