import { getSession } from 'next-auth/react';
import NavAdmin from '@/components/NavAdmin';
import MenuAdmin from '@/components/MenuAdmin';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';


export default function ReadStudent() {
  const API_URL = "http://localhost:3001/api/students/";

  const [student, setStudent] = useState({
    id: "",
    name: "",
    age: "",
    parents: "",
    phone: "",
    special: "",
    status: ""
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
      const getStudent = async () => {
        try {
          const response = await Axios.get(`${API_URL}${pid}`);
          setMessage({ message: response.data.message, status: "ok" });
          setStudent(response.data);
        } catch (error) {
          console.error('Erro ao buscar o usuário:', error);
          setMessage({ message: "Erro ao buscar o usuário!", status: "error" });
        }
      };

      getStudent();
    }
  }, [pid]);

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
          message.status === "ok" ? "" : 
          <div className='alert alert-danger' role='alert'> { message.message } <Link className='alert-link' href='/admin/students'>Voltar</Link></div>
        }
      </div>
  
      <div className="d-flex justify-content-center p-2">
        <div className="container">
            <div className="row border-bottom">
                <h3> Detalhes do estudante </h3>
            
                <form >
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Nome</label>
                    <input type="text" id="name" name="name" className="form-control" value={student.name} readOnly/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="age">Idade</label>
                    <input type="number" id="age" name="age" className="form-control" value={student.age} readOnly/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="parents">Parents</label>
                    <input type="text" id="parents" name="parents" className="form-control" value={student.parents} readOnly/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <input type="text" id="phone" name="phone" className="form-control" value={student.phone} readOnly/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="special">Special</label>
                    <input type="text" id="special" name="special" className="form-control" value={student.special} readOnly/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="status">Status</label>
                    <select className="form-select" id="status" name="status" value={student.status} readOnly>
                      {optionsStatus.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="form-group p-2">
                    <Link className="btn btn-outline-info" href="/admin/students">Voltar</Link>
                </div>
                </form>
            </div>
        </div>
      </div>  
  </>
  )
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