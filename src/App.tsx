import { Sidebar } from './components/Sidebar'
import { Overlay } from './components/Overlay'
import './App.css'
import { useState } from 'react'
import type { Agendamento } from './types/Agendamento'
import { ListaAgendamento } from './components/ListaAgendamento'
import { ListIcon } from "@phosphor-icons/react";



function App() {
  const[listaAgendamentos, setListaAgendamentos] = useState<Agendamento[]>([])
  const[sidebarAberto, setSidebarAberto] = useState(true)

  console.log(listaAgendamentos)

  function aoAdicionarAgendamento(agendamento: Agendamento){
    const novoId = listaAgendamentos.reduce((acumulador, itemAtual)=>  Math.max(acumulador, itemAtual.idAgendamento), 0) + 1;
    let novoPeriodo = ''
    const horarioEmNumero = parseInt(agendamento.horario.substring(0,2), 10)
    if (horarioEmNumero >= 9 && horarioEmNumero <= 12) {
       novoPeriodo = "Manhã"
    } else  if (horarioEmNumero >= 13 && horarioEmNumero <= 18) {
       novoPeriodo = "Tarde"
    } else if (horarioEmNumero >= 19 && horarioEmNumero <= 21) {
       novoPeriodo = "Noite"
    }
    const novoAgendamento = {...agendamento, idAgendamento: novoId, periodo: novoPeriodo}
    const novoArray = [...listaAgendamentos, novoAgendamento]
    setListaAgendamentos(novoArray)
  }

  function excluirAgendamento(idAgendamento: number){
    const novaListaAgendamentos = listaAgendamentos.filter(agendamento => agendamento.idAgendamento != idAgendamento)
    setListaAgendamentos(novaListaAgendamentos)
  }

  function fecharSideBar(){
    setSidebarAberto(false)
  }

  return <>
      <main className='flex overflow-x-hidden'>
        <button onClick={() => setSidebarAberto(!sidebarAberto)} className='cursor-pointer md:hidden bg-base-7 text-brand-1 flex pt-2 px-2'>
        <ListIcon size={32} color='currentColor' className='text-brand-1'/>
        </button>
        {sidebarAberto && <Overlay aoFechar={fecharSideBar}></Overlay>}
        <Sidebar agendamentos={listaAgendamentos} aoAdicionarAgendamento={aoAdicionarAgendamento} aberto={sidebarAberto} aoFechar={fecharSideBar}></Sidebar>
        <ListaAgendamento agendamentos={listaAgendamentos} excluirAgendamento={excluirAgendamento}></ListaAgendamento>
      </main>
  </>
}

export default App
