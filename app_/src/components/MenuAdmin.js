import Link from "next/link";

export default function MenuAdmin() {
    return (

    <div className="d-flex justify-content-start">
        <div className="p-2"><Link className="navbar-brand" href="#">Admin</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/users">Usuários</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/appointments">Appointments</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/students">Students</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/events">Events</Link></div>
      </div>

    )
}