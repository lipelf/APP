import { getSession } from 'next-auth/react';
import Axios from 'axios';
import NavAdmin from '@/components/NavAdmin';
import MenuAdmin from '@/components/MenuAdmin';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function UpdateTeacher() {
  const API_URL = "http://localhost:3001/api/teachers/";

  const [teacher, setTeacher] = useState({
    name: "",
    school_disciplines: "",
    contact: "",
    phone_number: "",
    status: ""
  });

  const router = useRouter();
  const { pid } = router.query;

  const [message, setMessage] = useState({ message: "", status: "" });

  useEffect(() => {
    if (pid) {
      const getTeacher = async () => {
        try {
          const response = await Axios.get(`${API_URL}${pid}`);
          setTeacher(response.data);
        } catch (error) {
          setMessage({ message: "Erro ao buscar os dados do professor!", status: "error" });
        }
      };

      getTeacher();
    }
  }, [pid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({
      ...teacher,
      [name]: value
    });
  };

  const handleUpdateTeacher = async () => {
    if (!pid) {
      setMessage({ message: "ID do professor não encontrado!", status: "error" });
      return;
    }

    const updatedTeacher = {
      name: teacher.name,
      school_disciplines: teacher.school_disciplines,
      contact: teacher.contact,
      phone_number: teacher.phone_number,
      status: teacher.status
    };

    try {
      const response = await Axios.put(`${API_URL}${pid}`, updatedTeacher);
      setMessage({ message: "Professor atualizado com sucesso!", status: "ok" });
      setTimeout(() => {
        router.push('/admin/teachers');
      }, 1500);
    } catch (error) {
      setMessage({ message: "Erro ao atualizar os dados do professor!", status: "error" });
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
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
          { 
          message.status === "" ? "" : 
          message.status === "ok" ? <div className='alert alert-success' role='alert'>{ message.message } <Link className='alert-link' href='/admin/teachers'>Voltar</Link></div> : 
          <div className='alert alert-danger' role='alert'>{ message.message } <Link className='alert-link' href='/admin/teachers'>Voltar</Link></div>
        }
            <h3>Edição de Professor</h3>
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-control" 
                  value={teacher.name} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="school_disciplines">Disciplina</label>
                <input 
                  type="text" 
                  id="school_disciplines" 
                  name="school_disciplines" 
                  className="form-control" 
                  value={teacher.school_disciplines} 
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
                  value={teacher.contact} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone_number">Telefone</label>
                <input 
                  type="text" 
                  id="phone_number" 
                  name="phone_number" 
                  className="form-control" 
                  value={teacher.phone_number} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="status">Status</label>
                <select 
                  className="form-select" 
                  id="status" 
                  name="status" 
                  value={teacher.status} 
                  onChange={handleChange}
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
              <div className="form-group p-2">
                <button className="btn btn-outline-success" type="button" onClick={handleUpdateTeacher}>Salvar</button>
                <Link className="btn btn-outline-info" href="/admin/teachers">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });


  if (!session) {
    return {
      redirect: {
        destination: '/login',  
        permanent: false,
      },
    };
  }


  return {
    props: { session }, 
  };
}
