import { getSession } from 'next-auth/react';
import NavAdmin from '@/components/NavAdmin';
import MenuAdmin from '@/components/MenuAdmin';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function UpdateUser() {
  const API_URL = "http://localhost:3001/api/users/";

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    user: "",
    pwd: "",
    level: "",
    status: ""
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
    { value: 'on', text: 'Ativo' },
    { value: 'off', text: 'Inativo' },
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleUpdateUser = async () => {
    try {
      console.log(`Updating user with ID: ${pid}`);
      console.log(`API URL: ${API_URL}${pid}`);
      console.log(`User data:`, user);
      const response = await Axios.put(`${API_URL}${pid}`, user);
      setMessage({ message: "Usuário atualizado com sucesso! ", status: "ok" });
      setTimeout(() => {
        router.push('/admin');
      }, 1500); 
      
    } catch (error) {
      console.error('Erro ao alterar o usuário:', error);
      setMessage({ message: "Erro ao alterar o usuário!", status: "error" });
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
  message.status === "ok" ? (
    <div className='alert alert-success' role='alert'> 
      { message.message } 
      <Link className='alert-link' href='/admin'>Voltar</Link>
    </div>
  ) : (
    <div className='alert alert-danger' role='alert'> 
      { message.message } 
      <Link className='alert-link' href='/admin'>Voltar</Link>
    </div>
  )
}
      </div>
  
      <div className="d-flex justify-content-center p-2">
        <div className="container">
            <div className="row border-bottom">
                <h3> Edição de Usuário </h3>
            
                <form method="POST">
                <div className="form-group">
                    <label className="form-label" htmlFor="author_name">Nome</label>
                    <input type="text" id="author_name" name="name" className="form-control" value={user.name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="author_email">E-mail</label>
                    <input type="text" id="author_email" name="email" className="form-control" value={user.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="author_user">Usuário</label>
                    <input type="text" id="author_user" name="user" className="form-control" value={user.user} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="author_pwd">Senha</label>
                    <input type="password" id="author_pwd" name="pwd" className="form-control" value={user.pwd} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="author_level">Nível</label>
                    <select className="form-select" id="author_level" name="level" value={user.level} onChange={handleChange}>
                      {optionsLevel.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="author_status">Status</label>
                    <select className="form-select" id="author_status" name="status" value={user.status} onChange={handleChange}>
                      {optionsStatus.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="form-group p-2">
                    <button className="btn btn-outline-success" type="button" onClick={handleUpdateUser} >Salvar</button>
                    <Link className="btn btn-outline-info" href="/admin">Voltar</Link>
                </div>
                </form>
            </div>
        </div>
      </div>  
  </>
  )
}

// Adicionando a verificação de sessão no getServerSideProps
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  // Verifica se o usuário está logado, caso contrário, redireciona
  if (!session) {
    return {
      redirect: {
        destination: '/login',  // Redireciona para a página de login
        permanent: false,
      },
    };
  }

  // Retorna os dados da página, caso o usuário esteja logado
  return {
    props: { session }, // Passa a sessão como prop
  };
}