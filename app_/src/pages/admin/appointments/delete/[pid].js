import NavAdmin from '@/components/NavAdmin';
import MenuUsers from '@/components/MenuUsers';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function DeleteUser() {
  const API_URL = "http://localhost:3001/api/users/";

  const [user, setUser] = useState({
    author_id: "",
    author_name: "",
    author_email: "",
    author_user: "",
    author_pwd: "",
    author_level: "",
    author_status: "",
    author_create_date: ""
  });

  const router = useRouter();
  const { pid } = router.query;

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsLevel = [
    { value: '', text: '-- Selecione um nível de acesso --' },
    { value: 'admin', text: 'Administrador' },
    { value: 'user', text: 'Usuário' },
    { value: 'reader', text: 'Leitor' },
  ];

  const optionsStatus = [
    { value: '', text: '-- Selecione um estado --' },
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  useEffect(() => {
    if (pid) {
      const getUser = async () => {
        try {
          const response = await Axios.get(`${API_URL}${pid}`);
          setMessage({ message: response.data.message, status: "ok" });
          setUser(response.data);
        } catch (error) {
          console.error('Erro ao buscar o usuário:', error);
          setMessage({ message: "Erro ao buscar o usuário!", status: "error" });
        }
      };

      getUser();
    }
  }, [pid]);

  const handleDeleteUser = async () => {
    try {
      const response = await Axios.delete(`${API_URL}${pid}`);
      setMessage({ message: response.data.message, status: "ok" });
      router.push('/admin/users'); // Redireciona para a lista de usuários após a deleção
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error);
      setMessage({ message: "Erro ao deletar o usuário!", status: "error" });
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
        <MenuUsers />
        { 
          message.status === "" ? "" : 
          message.status === "ok" ? <div className='alert alert-success' role='alert'> { message.message } <Link className='alert-link' href='/admin/users'>Voltar</Link></div> : 
          <div className='alert alert-danger' role='alert'> { message.message } <Link className='alert-link' href='/admin/users'>Voltar</Link></div>
        }
      </div>
  
      <div className="d-flex justify-content-center p-2">
        <div className="container">
            <div className="row border-bottom">
                <h3> Edição de Usuário </h3>
            
                <form method="POST">
                <div className="form-group">
                    <label className="form-label" htmlFor="author_name">Nome</label>
                    <input type="text" id="author_name" name="author_name" className="form-control" value={user.author_name} readOnly/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="author_email">E-mail</label>
                    <input type="text" id="author_email" name="author_email" className="form-control" value={user.author_email} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="author_user">Usuário</label>
                    <input type="text" id="author_user" name="author_user" className="form-control" value={user.author_user} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="author_pwd">Senha</label>
                    <input type="password" id="author_pwd" name="author_pwd" className="form-control" value={user.author_pwd} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="author_level">Nível</label>
                    <select className="form-select" id="author_level" name="author_level" value={user.author_level} readOnly>
                      {optionsLevel.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="author_status">Status</label>
                    <select className="form-select" id="author_status" name="author_status" value={user.author_status} readOnly>
                      {optionsStatus.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="author_create_date">Data de Criação</label>
                    <input type="text" id="author_create_date" name="author_create_date" className="form-control" value={ user.author_create_date } readOnly/>
                </div>
                <div className="form-group p-2">
                    <button className="btn btn-outline-danger" type="button" onClick={handleDeleteUser} >Deletar</button>
                    <Link className="btn btn-outline-info" href="/admin/users">Voltar</Link>
                </div>
                </form>
            </div>
        </div>
      </div>  
  </>
  )
}