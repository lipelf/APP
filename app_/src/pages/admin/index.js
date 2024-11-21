import { getSession } from 'next-auth/react';
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
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await Axios.get(API_URL);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar os usuários:", error);
      }
    };

    getAllUsers();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    const filtered = users.filter((user) => user.name.toLowerCase().includes(term));
    setFilteredUsers(filtered);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja deletar este usuário?");
    if (confirmDelete) {
      try {
        await Axios.delete(`${API_URL}/${id}`);
        alert("Usuário deletado com sucesso!");
        setUsers(users.filter((user) => user._id !== id));
        setFilteredUsers(filteredUsers.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Erro ao deletar o usuário:", error);
        alert("Erro ao deletar o usuário. Tente novamente.");
      }
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
            <h3>Lista de Usuários</h3>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <input
                type="text"
                placeholder="Buscar por nome..."
                className="form-control w-50"
                value={search}
                onChange={handleSearch}
              />
              <Link href="/admin/users/create" className="btn btn-primary ms-2">
                Criar Usuário
              </Link>
            </div>

            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Usuário</th>
                  <th scope="col">Nome</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <th scope="row">{user._id}</th>
                    <td className="text-truncate">{user.user}</td>
                    <td className="text-truncate">{user.name}</td>
                    <td className="text-truncate">{user.email}</td>
                    <td>
                      <a
                        className="btn btn-outline-success btn-sm me-2"
                        href={`/admin/users/read/${user._id}`}
                      >
                        Visualizar
                      </a>
                      <a
                        className="btn btn-outline-primary btn-sm me-2"
                        href={`/admin/users/update/${user._id}`}
                      >
                        Editar
                      </a>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

            {filteredUsers.length === 0 && (
              <p className="text-center text-light">Nenhum usuário encontrado.</p>
            )}
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
