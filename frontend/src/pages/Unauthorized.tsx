import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div>
      <h6>Unauthorized</h6>
      <button onClick={goBack}></button>
    </div>
  );
}
