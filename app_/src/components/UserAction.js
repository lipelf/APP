import Axios from "axios";

export default function UserAction({ pid }) {
  const API_URL = `http://localhost:3001/api/users/${pid}`;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza de que deseja deletar este usuário?");
    if (confirmDelete) {
      try {
        await Axios.delete(API_URL);
        alert("Usuário deletado com sucesso!");

        // Opcional: Atualiza a página ou dispara um evento para o componente pai
        window.location.reload(); // Recarrega a página
      } catch (error) {
        console.error("Erro ao deletar o usuário:", error);
        alert("Erro ao deletar o usuário. Tente novamente.");
      }
    }
  };

  return (
    <>
      <a className="btn btn-outline-success btn-sm me-2" href={`/admin/users/read/${pid}`}>Visualizar</a>
      <a className="btn btn-outline-primary btn-sm me-2" href={`/admin/users/update/${pid}`}>Editar</a>
      <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
        Deletar
      </button>
    </>
  );
}
