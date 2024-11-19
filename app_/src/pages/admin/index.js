import Axios from "axios";
import NavAdmin from "@/components/NavAdmin";
import MenuAdmin from "@/components/MenuAdmin";
import UserAction from "@/components/UserAction";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Users() {
  const API_URL = "http://localhost:3001/api/users";

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await Axios.get(API_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar os usuários:", error);
      }
    };

    getAllUsers();
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
            <h3>Lista de Usuários</h3>

            {/* Botão Criar Usuário */}
            <div className="d-flex justify-content-end mb-3">
              <Link href="/admin/users/create" className="btn btn-primary">
                Criar Usuário
              </Link>
            </div>

            {/* Tabela de Usuários */}
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <th scope="row">{user._id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <UserAction pid={user._id}></UserAction>
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