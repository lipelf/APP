import { getSession } from 'next-auth/react';
import Axios from 'axios'
import NavAdmin from '@/components/NavAdmin'
import StudentAction from '@/components/StudentAction'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import MenuAdmin from '@/components/MenuAdmin'


export default function users() {

  const API_URL = "http://localhost:3001/api/students"
  
  const [student, setStudents] = useState([]); 
  
  useEffect(() => {
    const getAllStudents = async () => {
      try {
        const response = await Axios.get(API_URL);
        setStudents(response.data);
      } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
      }
    };

    getAllStudents();

  }, []);

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
        <h3> Lista de estudantes </h3>
        
        <table className="table table-hover table-dark">
        <thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Idade</th>
            <th scope="col">Ação</th>
            </tr>
        </thead>
        <tbody>

        {student.map( students => (
            <tr key={students._id}>
              <th scope="row">{students._id}</th>
              <td>{students.name}</td>
              <td>{students.age}</td>
              <td>
                <StudentAction pid={ students._id }></StudentAction>
              </td>
            </tr>
        ))}

        </tbody>
        </table>
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


