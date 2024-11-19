import Link from "next/link";

export default function TeachersAction(props) {
    return (
        <>
            <Link className="btn btn-outline-success btn-sm me-2" href={`/admin/teachers/read/${ props.pid }`}>Visualizar</Link>
            <Link className="btn btn-outline-primary btn-sm me-2" href={`/admin/teachers/update/${ props.pid }`}>Editar</Link>
            <Link className="btn btn-outline-danger btn-sm" href={`/admin/teachers/delete/${ props.pid }`}>Deletar</Link>
        </>
    )
}
