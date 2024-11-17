import Link from "next/link";

export default function MenuAdmin() {
  return (
    <div className="sidebar">
      <ul className="menu-list">
        <li>
          <Link href="/admin">Usuários</Link>
        </li>
        <li>
          <Link href="/admin/appointments">Appointments</Link>
        </li>
        <li>
          <Link href="/admin/settings">Configurações</Link>
        </li>
      </ul>
    </div>
  );
}
