import { Sidebar } from './components/Sidebar'
import './App.css'
import { useState } from 'react'
import type { Agendamento } from './types/Agendamento'
import { ListaAgendamento } from './components/ListaAgendamento'

function App() {
  const[listaAgendamentos, setListaAgendamentos] = useState<Agendamento[]>([])
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


  return <>
      <main className='flex'>
        <Sidebar agendamentos={listaAgendamentos} aoAdicionarAgendamento={aoAdicionarAgendamento}></Sidebar>
        <ListaAgendamento agendamentos={listaAgendamentos} excluirAgendamento={excluirAgendamento}></ListaAgendamento>
      </main>
  </>
}

export default App
