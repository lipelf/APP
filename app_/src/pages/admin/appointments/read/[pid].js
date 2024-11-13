import NavAdmin from '@/components/NavAdmin';
import MenuAppointments from '@/components/MenuAppointments';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function ReadAppointments() {
  const API_URL = "http://localhost:3001/api/appointments/";

  const [appointment, setAppointment] = useState({
    specialty: "",
    comments: "",
    date: "",
    student: "",
    professional: "",
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
    { value: '', text: '-- Selecione um estado --' },
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  useEffect(() => {
    if (pid) {  
      const getAppointment = async () => {
        try {
          const response = await Axios.get(`${API_URL}${pid}`);
          setMessage({ message: response.data.message, status: "ok" });
          setAppointment(response.data);
        } catch (error) {
          console.error('Erro ao buscar appointment:', error);
          setMessage({ message: "Erro ao buscar appointment!", status: "error" });
        }
      };

      getAppointment();
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
        <MenuAppointments />
        { 
          message.status === "" ? "" : 
          message.status === "ok" ? "" : 
          <div className='alert alert-danger' role='alert'> { message.message } <Link className='alert-link' href='/admin/appointments'>Voltar</Link></div>
        }
      </div>
  
      <div className="d-flex justify-content-center p-2">
        <div className="container">
            <div className="row border-bottom">
                <h3> Detalhes do appointment </h3>
            
                <form method="POST">
                <div className="form-group">
                    <label className="form-label" htmlFor="comments">Comments</label>
                    <input type="text" id="comments" name="comments" className="form-control" value={appointment.comments} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="specialty">Specialty</label>
                    <input type="text" id="specialty" name="specialty" className="form-control" value={appointment.specialty} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="date">Date</label>
                    <input type="text" id="date" name="date" className="form-control" value={appointment.date} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student">Student</label>
                    <input type="text" id="student" name="student" className="form-control" value={appointment.student} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional">Nível</label>
                    <select className="form-select" id="professional" name="professional" value={appointment.professional} disabled>
                      {optionsLevel.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="status">Status</label>
                    <select className="form-select" id="status" name="status" value={appointment.status} disabled>
                      {optionsStatus.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="form-group p-2">
                    <Link className="btn btn-outline-info" href="/admin/appointments">Voltar</Link>
                </div>
                </form>
            </div>
        </div>
      </div>  
    </>
  )
}
