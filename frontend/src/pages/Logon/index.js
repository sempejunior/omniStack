import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import logoImg from '../../assets/heroesCoinWithoutCharacter.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {

            const response = await api.post('sessions', {id});
            console.log({ response });
            alert(`Seu id de acesso: ${response.data.name} `);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        } catch (err) {
            alert("Ong não cadastrada.");
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Heroes" />
                <form onSubmit= {handleLogin}>
                    <input placeholder="Seu ID"
                        value={id} onChange={e => setId(e.target.value)}
                    />
                    <input placeholder="Senha" />
                    <button type="submit" className="button" >Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="E02041" />
                        Não possuo cadastro
                    </Link>

                </form>



            </section>

            {/* <img src={heroesImg} alt="Heroes" /> */}
        </div>


    );
}