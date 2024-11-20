import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';
import NavAdmin from '@/components/NavAdmin';
import MenuAdmin from '@/components/MenuAdmin';
import Head from 'next/head';
import Link from 'next/link';

export default function ReadTeacher() {
  const API_URL = 'http://localhost:3001/api/teachers/'; // URL base da API

  const [teacher, setTeacher] = useState({
    name: '',
    school_disciplines: '',
    contact: '',
    phone_number: '',
    status: '',
  });

  const router = useRouter();
  const { pid } = router.query;

  const [message, setMessage] = useState({ message: '', status: '' });

  useEffect(() => {
    if (pid) {
      const getTeacher = async () => {
        try {
          const response = await Axios.get(`${API_URL}${pid}`);
          setMessage({ message: 'Professor encontrado!', status: 'ok' });

          setTeacher(response.data);
        } catch (error) {
          console.error('Erro ao buscar os dados do professor:', error);
          setMessage({ message: 'Erro ao buscar os dados do professor!', status: 'error' });
        }
      };

      getTeacher();
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
        {message.status === 'error' && (
          <div className="alert alert-danger" role="alert">
            {message.message} <Link href="/admin/teachers">Voltar</Link>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3>Detalhes do Professor</h3>
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={teacher.name || ''}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="school_disciplines">Disciplina</label>
                <input
                  type="text"
                  id="school_disciplines"
                  name="school_disciplines"
                  className="form-control"
                  value={teacher.school_disciplines || ''}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact">Contato</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  className="form-control"
                  value={teacher.contact || ''}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone_number">Telefone</label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  className="form-control"
                  value={teacher.phone_number || ''}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="status">Status</label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  className="form-control"
                  value={teacher.status ? 'Ativo' : 'Inativo'}
                  readOnly
                />
              </div>
              <div className="form-group p-2">
                <Link className="btn btn-outline-info" href="/admin/teachers">
                  Voltar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// Adicionando a verificação de sessão no getServerSideProps
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