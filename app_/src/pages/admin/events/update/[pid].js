import NavAdmin from '@/components/NavAdmin';
import MenuEvents from '@/components/MenuEvents';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function UpdateEvent() {
  const API_URL = "http://localhost:3001/api/events/";

  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    status: "",
  });

  const router = useRouter();
  const { pid } = router.query;

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsStatus = [
    { value: 'on', text: 'Ativo' },
    { value: 'off', text: 'Inativo' },
  ];

  useEffect(() => {
    if (pid) {
      const getEvent = async () => {
        try {
          const response = await Axios.get(`${API_URL}${pid}`);
          setEvent(response.data);
        } catch (error) {
          console.error('Erro ao buscar o evento:', error);
          setMessage({ message: "Erro ao buscar o evento!", status: "error" });
        }
      };

      getEvent();
    }
  }, [pid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value
    });
  };

  const handleUpdateEvent = async () => {
    try {
      // Crie um novo objeto com os dados necessários
      const cleanEvent = {
        title: event.title,
        description: event.description,
        location: event.location,
        status: event.status
      };
  
      console.log(`Updating event with ID: ${pid}`);
      console.log(`API URL: ${API_URL}${pid}`);
      console.log(`Event data:`, cleanEvent);
  
      const response = await Axios.put(`${API_URL}${pid}`, cleanEvent);
      setMessage({ message: "Evento atualizado com sucesso!", status: "ok" });
      setTimeout(() => {
        router.push('/admin/events');  // Redireciona após 1,5 segundos
      }, 1500); 
      
    } catch (error) {
      console.error('Erro ao alterar o evento:', error);
      setMessage({ message: "Erro ao alterar o evento!", status: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuEvents />
        { 
          message.status === "" ? "" : 
          message.status === "ok" ? (
            <div className='alert alert-success' role='alert'> 
              { message.message } 
              <Link className='alert-link' href='/admin/events'>Voltar</Link>
            </div>
          ) : (
            <div className='alert alert-danger' role='alert'> 
              { message.message } 
              <Link className='alert-link' href='/admin/events'>Voltar</Link>
            </div>
          )
        }
      </div>
  
      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Edição de Evento </h3>
        
            <form method="POST">
              <div className="form-group">
                <label className="form-label" htmlFor="event_name">Título</label>
                <input 
                  type="text" 
                  id="event_title" 
                  name="title" 
                  className="form-control" 
                  value={event.title} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="event_description">Descrição</label>
                <textarea 
                  id="event_description" 
                  name="description" 
                  className="form-control" 
                  value={event.description} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="event_location">Localização</label>
                <input 
                  type="text" 
                  id="event_location" 
                  name="location" 
                  className="form-control" 
                  value={event.location} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="event_status">Status</label>
                <select 
                  className="form-select" 
                  id="event_status" 
                  name="status" 
                  value={event.status} 
                  onChange={handleChange}
                >
                  {optionsStatus.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group p-2">
                <button className="btn btn-outline-success" type="button" onClick={handleUpdateEvent}>Salvar</button>
                <Link className="btn btn-outline-info" href="/admin/events">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>  
    </>
  )
}
