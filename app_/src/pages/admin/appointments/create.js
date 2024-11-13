import NavAdmin from '@/components/NavAdmin';
import MenuAppointments from '@/components/MenuAppointments';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Axios from 'axios';

export default function CreateAppointments() {
  const API_URL = "http://localhost:3001/api/appointments";

  const [appointment, setAppointment] = useState({
    specialty: "",
    comments: "",
    date: "",
    student: "",
    professional: "",
  });

  const [message, setMessage] = useState({ message: "", status: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointment({
      ...appointment,
      [name]: value
    });
  };

  const handleCreateAppointments = async () => {
    try {
      const response = await Axios.post(API_URL, appointment);
      setMessage({ message: response.data.message, status: "ok" });
    } catch (error) {
      console.error('Erro ao criar Appointment:', error);
      setMessage({ message: "Erro ao criar Appointment!", status: "error" });
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
        <MenuAppointments />
        { 
          message.status === "" ? "" : 
          message.status === "ok" ? <div className='alert alert-success' role='alert'> { message.message } <Link className='alert-link' href='/admin/appointments'>Voltar</Link></div> : 
          <div className='alert alert-danger' role='alert'> { message.message } <Link className='alert-link' href='/admin/appointments'>Voltar</Link></div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Cadastro de Agendamento </h3>
            <form method="POST">
              <div className="form-group">
                <label className="form-label" htmlFor="comments">Comments</label>
                <input type="text" id="comments" name="comments" className="form-control" value={appointment.comments} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="specialty">Specialty</label>
                <input type="text" id="specialty" name="specialty" className="form-control" value={appointment.specialty} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="date">Date</label>
                <input type="text" id="date" name="date" className="form-control" value={appointment.date} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="student">Student</label>
                <input type="text" id="student" name="student" className="form-control" value={appointment.student} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="professional">professional</label>
                <input className="form-select" id="professional" name="professional" value={appointment.professional} onChange={handleChange}>
                </input>
              </div>
              <div className="form-group p-2">
                <button className="btn btn-outline-success" type="button" onClick={handleCreateAppointments}>Salvar</button>
                <Link className="btn btn-outline-info" href="/admin/appointments">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}