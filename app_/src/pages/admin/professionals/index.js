import Axios from "axios";
import NavAdmin from "@/components/NavAdmin";
import MenuAdmin from "@/components/MenuAdmin";
import ProfessionalsAction from "@/components/ProfessionalsAction";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Professional() {
  const API_URL = "http://localhost:3001/api/professionals";

  const [professional, setProfessional] = useState([]);
  const [filteredProfessional, setFilteredProfessional] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllProfessional = async () => {
      try {
        const response = await Axios.get(API_URL);
        setProfessional(response.data);
        setFilteredProfessional(response.data);
      } catch (error) {
        console.error("Erro ao buscar os compromissos:", error);
      }
    };

    getAllProfessional();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    const filtered = professional.filter((professional) => professional._id.toLowerCase().includes(term));
    setFilteredProfessional(filtered);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja deletar este compromisso?");
    if (confirmDelete) {
      try {
        await Axios.delete(`${API_URL}/${id}`);
        alert("Compromisso deletado com sucesso!");
        // Remove o usuário deletado da lista exibida
        setProfessional(professional.filter((professional) => professional._id !== id));
        setFilteredProfessional(filteredProfessional.filter((professional) => professional._id !== id));
      } catch (error) {
        console.error("Erro ao deletar o compromisso:", error);
        alert("Erro ao deletar o compromisso. Tente novamente.");
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
            <h3>Lista de Profissionais </h3>

            {/* Campo de Busca */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Buscar por id..."
                className="form-control"
                value={search}
                onChange={handleSearch}
              />
            </div>

            {/* Botão Criar Usuário */}
            <div className="d-flex justify-content-end mb-3">
              <Link href="/admin/professionals/create" className="btn btn-primary">
                Criar Profissional
              </Link>
            </div>

            {/* Tabela de Usuários */}
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Especialidade</th>
                  <th scope="col">Celular</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfessional.map((professional) => (
                  <tr key={professional._id}>
                    <th scope="row">{professional._id}</th>
                    <td>{professional.name}</td>
                    <td>{professional.specialty}</td>
                    <td>{professional.phone_number}</td>
                    <td>
                      <a
                        className="btn btn-outline-success btn-sm me-2"
                        href={`/admin/professionals/read/${professional._id}`}
                      >
                        Visualizar
                      </a>
                      <a
                        className="btn btn-outline-primary btn-sm me-2"
                        href={`/admin/professionals/update/${professional._id}`}
                      >
                        Editar
                      </a>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(professional._id)}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProfessional.length === 0 && (
              <p className="text-center text-light">Nenhum compromisso encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}