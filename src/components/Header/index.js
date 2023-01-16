import { useContext } from 'react';
import './style.css';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaRegSun } from "react-icons/fa";

export default function Header(){
    const { user } = useContext(AuthContext)
    return(
        <div className='sidebar'>
            <div>
            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="foto avatar" />
            </div>
            <Link to="/dashboard">
                <FaHome color="#fff" size={25}/>
                Chamados
            </Link>
            <Link to="/customers">
                <FaUsers color="#fff" size={25}/>
                Clientes
            </Link>
            <Link to="/profile">
                <FaRegSun color="#fff" size={25}/>
                Configurações
            </Link>
        </div>

        
    )
}