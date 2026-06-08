import { Link } from "react-router-dom"


const AdminFooter = () => {
  return (
    <footer className="flex justify-between items-center text-[10px] px-20 bg-secondary1 h-17 text-white">
      <small className="opacity-70"><strong>CASAS EM MILHO VERDE</strong> - TODOS DIREITOS RESERVADOS - 2026</small>
      <small className="opacity-70">DESENVOLVIDO POR <strong><Link target="_blank" to="https://www.instagram.com/joaocampos_digital/">@JOAOCAMPOS_DIGITAL</Link></strong></small>
    </footer>
  )
}

export default AdminFooter