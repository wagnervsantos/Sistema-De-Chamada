import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';
import './style.css';
import logo from "../../assets/logo.png"


function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { SignIn, loadingAuth } = useContext(AuthContext);


    function hadnleSubmit(e){
        e.preventDefault();
        if(email !== "" && password !== ""){
          SignIn(email, password)
        }
    }

    return (
      <div className='container-center'>
        <div className='login'>
            <div className='logo-area'>
                <img  src={logo} alt="sistema logo"/>
            </div>
            <form onSubmit={hadnleSubmit}>
                <h1>Entrar</h1>
                <input type="text" placeholder='email@gmail.com' value={email} onChange={ (e) => setEmail(e.target.value) } />
                <input type="password" placeholder='*****' value={password} onChange={ (e) => setPassword(e.target.value)}/>
                <button type='submit'>{loadingAuth ? "Carregandoo..." : 'Acessar'}</button>
            </form>
        <Link to="/register">Criar uma conta!</Link>

        </div>
       
      </div>
    );
  }
  
  export default SignIn;