import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/heroesCoinWithoutCharacter.png';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        try{
            const data = { name, email, whatsapp, city, uf };

            const response = await api.post('ongs', data);
    console.log ({response});
            alert(`Seu id de acesso: ${response.data} `);
            history.push('/');
        }catch(err){
            alert("Erro no cadastro.");
        }
        
    }


    return (
        <div className="register-container">

            <div className="content">

                <section>
                    <img src={logoImg} alt="Be the hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua Ong.</p>


                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="E02041" />
                        Voltar para o Login
                    </Link>
                </section>
                <form onSubmit={handleRegister}>

                    <input
                        placeholder="Nome da Ong"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="button" >Cadastrar</button>
                </form>


            </div>
        </div>

    );
}