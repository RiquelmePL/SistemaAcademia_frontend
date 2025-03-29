import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Assets/HomePage.css';
import MenuBar from "../Components/MenuBar";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";
import "../Assets/Forms.css";


export default function CadastroAvFisica({ submitUrl }) {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [IsAdmin,setIsAdmin] = useState('')
    const [formData, setFormData] = useState({
        altura: '',
        peso: '',
        observacoes: '',
        biotipo: '',
        medidas: '',
        aluno_id: ''
    });
    const [aluno, setAlunos] = useState([]);


    /*
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

    */

    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
    };

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // Handle aula selection
    const handleAulaChange = (e) => {
        setAulaSelecionada(e.target.value);
    };

    const adicionarAula = () => {
        if (aulaSelecionada && !aulas.includes(aulaSelecionada)) {
            setAulas([...aulas, aulaSelecionada]);
        }
    };

    const removerAula = (aula) => {
        setAulas(aulas.filter((item) => item !== aula));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare the data with selected aulas
        const dataToSubmit = {
            ...formData,
            aulas, // Add selected classes (aulas) here
        };

        axios.post(submitUrl, dataToSubmit)
            .then((response) => {
                setFeedback({ message: 'Cadastro realizado com sucesso!', type: 'success' });
            })
            .catch((error) => {
                setFeedback({ message: 'Erro ao cadastrar aluno!', type: 'error' });
            });
    };

    return (
        <>
            <TopBar Titulo={"Sistema Academia"} Username={username} />
            <div className="home-page">
                <MenuBar />

                <form className="generic-form" onSubmit={handleSubmit}>
                    {/* Matrícula */}
                    <div className="form-group">
                        <label htmlFor="altura">Altura / cm</label>
                        <input
                            type="number"
                            id="altura"
                            name="altura"
                            value={formData.altura}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Nome */}
                    <div className="form-group">
                        <label htmlFor="peso">Peso / kg</label>
                        <input
                            type="number"
                            id="peso"
                            name="peso"
                            value={formData.peso}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Data de Nascimento */}
                    <div className="form-group">
                        <label htmlFor="observacoes">Observações</label>
                        <textarea
                            name="observacoes"
                            value={formData.observacoes}
                            onChange={handleChange}
                            cols={40}
                            rows={4}
                            required
                        />
                    </div>

                    {/* CPF */}
                    <div className="form-group">
                        <label htmlFor="biotipo">Biotipo</label>
                        <input
                            type="text"
                            id="biotipo"
                            name="biotipo"
                            value={formData.biotipo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="medidas">Medidas</label>
                        <input
                            type="medidas"
                            id="medidas"
                            name="medidas"
                            value={formData.medidas}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Plano Selection */}
                    <div className="form-group">
                        <label htmlFor="aluno_id">Aluno</label>
                        <select
                            id="aluno_id"
                            name="aluno_id"
                            value={formData.aluno_id}
                            onChange={handleChange}
                            required
                        >
                            {aluno.length > 0 ? (
                                aluno.map((aluno) => (
                                    <option key={aluno.id} value={aluno.id}>
                                        {aluno.nome}
                                    </option>
                                ))
                            ) : (
                                <option value="">Carregando...</option>
                            )}
                        </select>
                    </div>

                    <button type="submit">Cadastrar</button>
                </form>

                <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
            </div>
        </>
    );
}
