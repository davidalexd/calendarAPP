import React from "react";
import { useDispatch } from "react-redux";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./login.css";
// {/* https://codepen.io/FlorinPop17/pen/vPKWjd */}
export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "davidalexd@gmail.com",
    lPassword: "123456",
  });
  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName:'koko',
    rEmail:'koko@gmail.com',
    rPassword1:'123456',
    rPassword2:'123456',
  });
  const { lEmail, lPassword } = formLoginValues;
  const { rName,rEmail,rPassword1,rPassword2} = formRegisterValues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword))
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if(rPassword1!==rPassword2){
      return console.log("contra no iguales")
    }
    dispatch(startRegister(rEmail, rPassword1,rName))
  };
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                name="lEmail"
                className="form-control"
                placeholder="Correo"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="lPassword"
                className="form-control"
                placeholder="Contraseña"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
          
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword1"
                value={rPassword1}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="new-password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rPassword2"
                value={rPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
