import Axios from 'axios';
import NavAdmin from '@/components/NavAdmin';
import MenuAdmin from '@/components/MenuAdmin';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function UpdateProfessional() {
  const API_URL = "http://localhost:3001/api/professionals/";

  const [professional, setProfessional] = useState({
    name: "",
    specialty: "",
    contact: "",
    phone_number: "",
    status: ""
  });

  const router = useRouter();
  const { pid } = router.query;

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsStatus = [
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  useEffect(() => {
    if (pid) {
      const getProfessional = async () => {
        try {
          const response = await Axios.get(`${API_URL}${pid}`);
          setProfessional(response.data);
        } catch (error) {
          setMessage({ message: "Erro ao buscar o profissional!", status: "error" });
        }
      };

      getProfessional();
    }
  }, [pid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfessional({
      ...professional,
      [name]: value
    });
  };

  const handleUpdateProfessional = async () => {
    if (!pid) {
      setMessage({ message: "ID do profissional não encontrado!", status: "error" });
      return;
    }

    try {
      const response = await Axios.put(`${API_URL}${pid}`, professional);
      setMessage({ message: "Profissional atualizado com sucesso!", status: "ok" });
      setTimeout(() => {
        router.push('/admin/professionals');
      }, 1500);
    } catch (error) {
      setMessage({ message: "Erro ao atualizar o profissional!", status: "error" });
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
        <MenuAdmin />
        { 
          message.status === "" ? "" : 
          message.status === "ok" ? <div className='alert alert-success' role='alert'> { message.message } <Link className='alert-link' href='/admin/professionals'>Voltar</Link></div> : 
          <div className='alert alert-danger' role='alert'> { message.message } <Link className='alert-link' href='/admin/professionals'>Voltar</Link></div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3>Edição de Profissional</h3>
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-control" 
                  value={professional.name} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="specialty">Especialidade</label>
                <input 
                  type="text" 
                  id="specialty" 
                  name="specialty" 
                  className="form-control" 
                  value={professional.specialty} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact">Contato</label>
                <input 
                  type="text" 
                  id="contact" 
                  name="contact" 
                  className="form-control" 
                  value={professional.contact} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone_number">Número de Telefone</label>
                <input 
                  type="text" 
                  id="phone_number" 
                  name="phone_number" 
                  className="form-control" 
                  value={professional.phone_number} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="status">Status</label>
                <select 
                  className="form-select" 
                  id="status" 
                  name="status" 
                  value={professional.status} 
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
                <button className="btn btn-outline-success" type="button" onClick={handleUpdateProfessional}>Salvar</button>
                <Link className="btn btn-outline-info" href="/admin/professionals">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
