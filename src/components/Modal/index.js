import './style.css';

import { FaTimes } from 'react-icons/fa';

export default function Modal({conteudo, close}){
    return(
        <div className='modal'>
           <div className='container'>
            <button className='close' onClick={ close }>
                <FaTimes size={23} color='#fff'/>
                voltar
            </button>
            <div>
                <h2>Detalhe do chamado</h2>

                <div className='row'>
                    <span>
                        cliente: <i>{conteudo.cliente}</i>
                    </span>
                </div>

                <div className='row'>
                    <span>
                        Assunto: <i>{conteudo.assunto}</i>
                    </span>
                    <span>
                        Cadastrado em: <i>{conteudo.createdFormated}</i>
                    </span>
                </div>

                <div className='row'>
                    <span>
                        Status: <i style={{ color: '#fff', backgroundColor: conteudo.status === "Aberto" ? '#5cb85c' : '#999' }}>{conteudo.status}</i>
                    </span>
                </div>

                {conteudo.complemento !== '' && (
                    <>
                        <h3>complemento</h3>
                        <p>
                            {conteudo.complemento}
                        </p>
                    </>
                )}

            </div>
           </div>
        </div>
    )
}