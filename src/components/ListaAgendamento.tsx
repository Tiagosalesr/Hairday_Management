import type { Agendamento } from "../types/Agendamento";


interface ListaAgendamentosProps {
    agendamentos: Agendamento[];
    excluirAgendamento: (idAgendamento: number) => void;
}

interface PeriodoAgendamentosProps {
    titulo: string;
    agendamentos: Agendamento[];
}

function PeriodoAgendamento({titulo, agendamentos}: PeriodoAgendamentosProps){
    let periodo = ""

    if(titulo.toLowerCase() === "manhã"){
        periodo = "09h-12h"
    } else if(titulo.toLowerCase() === "tarde") {
        periodo = "13h-18h"
    } else {
        periodo = "19h-21h"
    }

    agendamentos.map
        return (
            <div>
                    <div>
                        <p>{titulo}</p>
                        <p>{periodo}</p>                
                    </div>
                    <div>
                        <p></p>
                    </div>
            </div>
        )
}

function ListaAgendamentos({agendamentos, excluirAgendamento}: ListaAgendamentosProps){
    function handleExcluir(){
        //excluirAgendamento()
    }

    return (

    )

    //text.substring(0, 2) parseInt(str, 10) 
}