import React, { useState, useEffect } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/heroesCoinWithoutCharacter.png';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';


export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    console.log(ongName);

  async function handleDeleteIncident(id) {
        try {
            
            api.delete(`incident/${id}`,{
                headers: {
                    Authorization: ongId,
                }
            });
            //Apagar o incidente da tela que ja foi excluido
            setIncidents(incidents.filter(incident => incident.id != id))
        } catch (error) {
            alert("Erro ao deletar caso, tente novamente.");
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');

    }

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    return (
        <div className="profile-container">

            <header>
                <img src={logoImg} alt="Be the hero" />
                <span>Bem vindo, {ongName}</span>
                <Link className="button" to="incidents/new" >Cadastrar novo caso</Link>
                <button type="button" onClick = {()=> handleLogout()}>
                    <FiPower size={18} color="#e02041"></FiPower>

                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        {/* <p>{incident.value}</p> */}

                        <button type="button" onClick={()=> handleDeleteIncident(incident.id)} >
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}