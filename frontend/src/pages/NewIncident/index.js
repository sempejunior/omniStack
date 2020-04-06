import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/heroesCoinWithoutCharacter.png';
import { Link , useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleCreateIncident(e) {
        e.preventDefault();

        const data = { title, description, value };

        const response = await api.post('incident', data, {
            headers: {
                Authorization: ongId
            }
        });
        console.log({ response });
        alert ("Incidente criado com sucesso");
        history.push('/profile');

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="E02041" />
                        Voltar para o Home
                    </Link>
                </section>
                <form onSubmit={handleCreateIncident}>

                    <input
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button type="submit" className="button" >Cadastrar</button>
                </form>


            </div>
        </div>
    );
}