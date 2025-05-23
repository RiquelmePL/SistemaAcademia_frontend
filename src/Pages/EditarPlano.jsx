import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate , useParams } from "react-router-dom";
import '../Assets/HomePage.css';
import MenuBar from "../Components/MenuBar";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";
import "../Assets/Forms.css";
import addIcon from '../Assets/add-64px.png';  // Caminho para o ícone "mais"
import removeIcon from '../Assets/lixo.png'; // Caminho para o ícone "remover"

export default function EditarPlano({ submitUrl }) {
    const navigate = useNavigate();
    const {id} = useParams()
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        valor: '',
        descricao: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5000/FormAtualizarPlano/' + id, { withCredentials: true })
            .then(response => {
                if (response.data.plano) {
                    setFormData({
                            nome: response.data.plano.nome,
                            valor: response.data.plano.valor,
                            descricao: response.data.plano.descricao
                    });
                } else {

                }
            })
            .catch();
    }, []);

    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
    };

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare the data with selected
        const dataToSubmit = {
            // implement
        };

        axios.put(submitUrl +id, formData)
            .then((response) => {
                setFeedback({ message: 'Cadastro realizado com sucesso!', type: 'success' });
            })
            .catch((error) => {
                setFeedback({ message: 'Erro ao cadastrar Aparelho!', type: 'error' });
            });
    };

    return (
        <>
            <TopBar Titulo={"Sistema Academia"} Username={username} />
            <div className="home-page">
                <MenuBar />

                <form className="generic-form" onSubmit={handleSubmit}>

                    {/* Nome */}
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Valor */}
                    <div className="form-group">
                        <label htmlFor="valor">Preço</label>
                        <input
                            type="number"
                            step="0.010"
                            min="0"
                            id="valor"
                            name="valor"
                            value={formData.valor}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Descrição */}
                    <div className="form-group">
                        <label htmlFor="descricao">Descrição</label>
                        <input
                            type="text"
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <button type="submit">Cadastrar</button>
                </form>

                <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
            </div>
        </>
    );
}
