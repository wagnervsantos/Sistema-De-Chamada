import './style.css';
import { useState, useEffect } from "react";
import firebase from '../../services/firebaseConnection';

import Header from "../../components/Header";
import Title from '../../components/Title';
import { FaTwitch, FaPlus, FaSearch, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Modal from '../../components/Modal';

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

export default function Dashboard(){
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [showPostModal, setShowModal] = useState(false);
    const [detail, setDetail] = useState();
 
    useEffect(()=> {

        async function loadChamados(){
        await listRef.limit(5)
        .get()
        .then((snapshot)=>{
            updateState(snapshot);
        })
        .catch((err)=>{
            console.log('DEU ALGUM ERRO', err);
            setLoadingMore(false)
        })
        setLoading(false)
    }

        loadChamados();

        return()=> {

        }
    }, []);

    
    
    async function updateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty){
            let lista = [];

            snapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento

                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length -1];//pegando o ultimo docuemnto buscado 

            setChamados(chamados => [...chamados, ...lista]);
            setLastDocs(lastDoc);

        }else{
            setIsEmpty(true)
        }

        setLoadingMore(false)
    }

    async function handleMore(){
       setLoadingMore(true);
       await listRef.startAfter(lastDocs).limit(5)
       .get()
       .then((snapshot)=>{
        updateState(snapshot)
       })
    }

    function togglePostModal(item){
        setShowModal(!showPostModal) //trocando de true para false
        setDetail(item);
    }

    if(loading){
        return(
            <div>
                <Header/>
                <div className='content'>
                    <Title name="Atendimentos">
                        <FaTwitch size={25}/>
                    </Title>

                    <div className='container dashboard'>
                        <span>Buscando chamados...</span>
                    </div>

                </div>
            </div>
        )
    }
    
    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name='Atendimentos'>
                <FaTwitch size={25}/>
                </Title>

                {chamados.length === 0 ?(
                    <div className='container dashboard'>
                    <span>Nenhum chamado registrado...</span>
                    <Link to='/new' className='new'>
                        <FaPlus size={25} color='#fff'/>
                        Novo chamado
                    </Link>
    
                </div>
    
                ): (
                    <>
                    <Link to='/new' className='new'>
                        <FaPlus size={25} color='#fff'/>
                        Novo chamado
                    </Link>

                    <table>
                        <thead>
                            <tr>
                                <th scope='col'>Clientes</th>
                                <th scope='col'>Assuntos</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Cadastro em</th>
                                <th scope='col'>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chamados.map((item, index)=>{
                                return(
                                 <tr key={index}>
                                    <td data-Label='Clientes'>{item.cliente}</td>
                                    <td data-Label='Asssunto'>{item.assunto}</td>
                                    <td data-Label='Status'>
                                        <span className='badge' style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}>{item.status}</span>
                                    </td>
                                    <td data-Label='Cadastro'>{item.createdFormated}</td>
                                    <td data-Label='#'>
                                        <button className='action' style={{backgroundColor: '#3583f6'}} onClick={ () => togglePostModal(item) }>
                                            <FaSearch color='#fff' size={18}/>
                                        </button>
                                        <Link className='action' style={{backgroundColor: '#f6a935'}} to={`/new/${item.id}`}>
                                            <FaEdit color='#fff' size={18}/>
                                        </Link>
                                    </td>
                                </tr>
                                )
                            })}
                           
                        </tbody>
                    </table>

                    {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando dados...</h3>}
                    {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais </button>}
                    </>
                )}
            
            </div>
            {showPostModal && (
                <Modal
                conteudo={detail}
                close={togglePostModal}
                />
            )}
        </div>
    )
}