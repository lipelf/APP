import Axios from 'axios'
import NavAdmin from '@/components/NavAdmin'
import MenuAdmin from '@/components/MenuAdmin'
import AppointmentsAction from '@/components/AppointmentsAction'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Appointments() {

  const API_URL = "http://localhost:3001/api/appointments"
  
  const [appointments, setAppointments] = useState([]); 
  
  useEffect(() => {
    const getAllAppointments = async () => {
      try {
        const response = await Axios.get(API_URL);
        setAppointments(response.data);
      } catch (error) {
        console.error('Erro ao buscar os compromissos:', error);
      }
    };

    getAllAppointments();

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
            <h3>Lista de Compromissos</h3>

            {/* Botão Criar Compromisso */}
            <div className="d-flex justify-content-end mb-3">
              <Link href="/admin/appointments/create" className="btn btn-primary">
                Criar Compromisso
              </Link>
            </div>

            {/* Tabela de Compromissos */}
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Data</th>
                  <th scope="col">Estudante</th>
                  <th scope="col">Profissional</th>
                  <th scope="col">Especialidade</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment._id}>
                    <th scope="row">{appointment._id}</th>
                    <td>{appointment.date}</td>
                    <td>{appointment.student}</td>
                    <td>{appointment.professional}</td>
                    <td>{appointment.specialty}</td>
                    <td>
                      <AppointmentsAction pid={appointment._id}></AppointmentsAction>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>  
    </>
  );
}