import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Assets/HomePage.css'
import MenuBar from "../Components/MenuBar";
import TableComponent from "../Components/TableContent";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";


export default function Aulas({AddPath, urlView , urlEdit , deleteUrl}){
    const navigate = useNavigate();
    const titulo = "Tabela de Aulas";
    const headers = ["Tipo", "Horario", "Sala"];
    const [aulas,setAulas] = useState('')
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [IsAdmin,setIsAdmin] = useState('')
    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
      };
    
    useEffect(() => {
        axios.get('http://localhost:5000/session', { withCredentials: true })
            .then(response => {
                if (response.data.permission === 'OK') {
                    setUsername(response.data.user);
                    setIsAdmin(response.data.isAdm);
                } else {
                    navigate('/');
                }
            })
            .catch(() => navigate('/'));
    }, [navigate]);

    
    useEffect(() => {
        axios.get('http://localhost:5000/ListarAula', { withCredentials: true })
            .then(response => {
                if (response.data.aulas) {
                    setAulas(response.data.aulas)
                } else {

                }
            })
            .catch(() => {

            });
    }, []);  // Lista de dependências vazia, a requisição será feita apenas uma vez

    return (
        <>
        <TopBar Titulo={"Sistema Academia"} Username={username} IsAdmin={IsAdmin}/>
        <div class="home-page">
            <MenuBar />
            <TableComponent titulo={titulo} dados={aulas} headers={headers} AddPath={AddPath} urlEdit={urlEdit} urlView={"/aulas/view"} keyUnique={"id_aula"} deleteUrl={"http://localhost:5000/ExcluirAula"}/>
            <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
        </div>
        </>
    );
}