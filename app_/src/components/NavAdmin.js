import Link from "next/link";

export default function NavAdmin() {
    return (

        <nav className="navbar navbar-light bg-warning justify-content-between p-2" style={{
            backgroundColor: 'green',
            padding: '10px', 
            justifyContent: 'space-between'
          }}>
           
            <Link className="navbar-brand" href="#"><h2>Sistema de Gestão de Ensino Especial</h2></Link>
            <div className="form-group">
                    <Link className="btn btn-danger" href="/">Logout</Link>
            </div>   

        </nav>
    )
}
