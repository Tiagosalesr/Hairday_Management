import { Sidebar } from './components/Sidebar'
import './App.css'
import { useState } from 'react'
import type { Agendamento } from './types/Agendamento'

function App() {
  const[listaAgendamentos, setListaAgendamentos] = useState<Agendamento[]>([])
  console.log(listaAgendamentos)
  
  function aoAdicionarAgendamento(agendamento: Agendamento){
    const novoId = listaAgendamentos.reduce((acumulador, itemAtual)=>  Math.max(acumulador, itemAtual.idAgendamento), 0) + 1;
    const novoAgendamento = {...agendamento, idAgendamento: novoId}
    const novoArray = [...listaAgendamentos, novoAgendamento]
    setListaAgendamentos(novoArray)
  }

  return <>
      <main>
        <Sidebar aoAdicionarAgendamento={aoAdicionarAgendamento}></Sidebar>
      </main>
  </>
}

export default App
