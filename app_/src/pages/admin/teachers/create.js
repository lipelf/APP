import { getSession } from 'next-auth/react';
import NavAdmin from '@/components/NavAdmin';
import MenuAdmin from '@/components/MenuAdmin';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Axios from 'axios';

export default function CreateTeachers() {
  const API_URL = "http://localhost:3001/api/teachers"; // Alterado para a URL dos professores

  const [teacher, setTeacher] = useState({
    name: "",
    school_disciplines: "",
    contact: "",
    phone_number: "",
    status: ""
  });

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsStatus = [
    { value: '', text: '-- Selecione um estado --' },
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeacher({
      ...teacher,
      [name]: value
    });
  };

  const handleCreateTeachers = async () => {
    try {
      const response = await Axios.post(API_URL, teacher);
      setMessage({ message: response.data.message, status: "ok" });
    } catch (error) {
      console.error('Erro ao criar Teacher:', error);
      setMessage({ message: "Erro ao criar Teacher!", status: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Cadastro de Professores" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuAdmin />
        { 
          message.status === "" ? "" : 
          message.status === "ok" ? <div className='alert alert-success' role='alert'> { message.message } <Link className='alert-link' href='/admin/teachers'>Voltar</Link></div> : 
          <div className='alert alert-danger' role='alert'> { message.message } <Link className='alert-link' href='/admin/teachers'>Voltar</Link></div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Cadastro de Professor </h3>
            <form method="POST">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" className="form-control" value={teacher.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="school_disciplines">Disciplinas</label>
                <input type="text" id="school_disciplines" name="school_disciplines" className="form-control" value={teacher.school_disciplines} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact">Contato</label>
                <input type="text" id="contact" name="contact" className="form-control" value={teacher.contact} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone_number">Telefone</label>
                <input type="text" id="phone_number" name="phone_number" className="form-control" value={teacher.phone_number} onChange={handleChange} />
              </div>
              <div className="form-group">
                    <label className="form-label" htmlFor="status">Status</label>
                    <select className="form-select" id="status" name="status" value={teacher.status} onChange={handleChange}>
                      {optionsStatus.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                </div>
              <div className="form-group p-2">
                <button className="btn btn-outline-success" type="button" onClick={handleCreateTeachers}>Salvar</button>
                <Link className="btn btn-outline-info" href="/admin/teachers">Voltar</Link>
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
