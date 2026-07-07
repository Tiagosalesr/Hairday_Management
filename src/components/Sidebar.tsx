import React, { useState } from "react";
import type { Agendamento } from "../types/Agendamento";

interface SidebarProps {
    aoAdicionarAgendamento: (agendamento: Agendamento) => void;
}

interface HorariosDoPeriodoProps {
    aoSelecionarHorario: (horario: string) => void;
    titulo: string;
    horarios: string[];
    horarioSelecionado: string;
}

function HorariosDoPeriodo({horarioSelecionado, titulo, horarios, aoSelecionarHorario}: HorariosDoPeriodoProps){
        return (
            <div>
                <p className="py-3">{titulo}</p>
                {horarios.map(horario => {
                    const estaSelecionado = horario === horarioSelecionado;
                    
                    return (
                            <button
                                key={horario}
                                className={estaSelecionado ? "m-2 w-25 h-12 bg-base-6 text-brand-2 border-brand-2 border-2 rounded-xl" : "border-base-5 border-2 m-2 w-25 h-12 rounded-xl cursor-pointer bg-base-6 hover:bg-base-5"}
                                onClick={() => aoSelecionarHorario(horario)}
                            >
                                {horario}
                            </button>
                        );
                })}
            </div>
        )
    }



export function Sidebar({aoAdicionarAgendamento}: SidebarProps){
    const[formularioAgendamento, setFormularioAgendamento] = useState<Agendamento>({idAgendamento: 0, nome: '', data: '', horario: ''})

    function handleAgendar(){
        aoAdicionarAgendamento({...formularioAgendamento})
    }

    function aoSelecionarHorario(horario: string){
        setFormularioAgendamento({...formularioAgendamento, horario: horario})   
    }

    return (
        <div className="pt-24 px-30 w-150 h-screen bg-base-7 text-base-1 flex flex-col">
            <div>
                <h1 className="text-3xl font-bold">Agende um atendimento</h1>
                <p className="pt-3 pb-5">Selecione data, horário e informe o nome do cliente para criar o agendamento</p>
            </div>
            <h4 className="font-bold">Data</h4>
            <select className='border-base-5 border-2 rounded-2xl h-10' value={formularioAgendamento.data} name="Data" id="Datas" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFormularioAgendamento({...formularioAgendamento, data: event.target.value})}>
                <option className="bg-base-5" value="Data1">Data1</option>
                <option className="bg-base-5" value="Data2">Data2</option>
                <option className="bg-base-5" value="Data3">Data3</option>
            </select>
            <div >
                <h4 className="pt-5 pb-2 font-bold">Horários</h4>
                <HorariosDoPeriodo horarioSelecionado = {formularioAgendamento.horario} aoSelecionarHorario = {aoSelecionarHorario} titulo="Manhã" horarios={['09:00', '10:00', '11:00', '12:00']}></HorariosDoPeriodo>
                <HorariosDoPeriodo horarioSelecionado = {formularioAgendamento.horario} aoSelecionarHorario = {aoSelecionarHorario} titulo="Tarde" horarios={['13:00', '14:00', '15:00', '16:00', '17:00', '18:00']}></HorariosDoPeriodo>
                <HorariosDoPeriodo horarioSelecionado = {formularioAgendamento.horario} aoSelecionarHorario = {aoSelecionarHorario} titulo="Noite" horarios={['19:00', '20:00', '21:00']}></HorariosDoPeriodo>
                <h4>Cliente</h4>
                <input className="border-base-5 border-2 rounded-xl h-12 w-full" placeholder="   Digite o nome do paciente" type="text" value={formularioAgendamento.nome} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFormularioAgendamento({...formularioAgendamento, nome: event.target.value})}/>
                <button 
                className="bg-brand-2 text-base-8 font-bold w-full h-16 rounded-xl mt-8 hover:border-brand-1 border-2 cursor-pointer"
                onClick={handleAgendar}
                >AGENDAR</button>
            </div>
        </div>
    )
}