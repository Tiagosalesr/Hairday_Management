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
                <p>{titulo}</p>
                {horarios.map(horario => {
                    const estaSelecionado = horario === horarioSelecionado;
                    
                    return (
                            <button
                                key={horario}
                                className={estaSelecionado ? "m-2 w-20 h-10 bg-gray-600 text-amber-400 border-amber-400 border-2 rounded-xl" : " m-2 w-20 h-10 rounded-xl cursor-pointer bg-gray-600"}
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

    function aoSelecionarHorario(horario: string){
        setFormularioAgendamento({...formularioAgendamento, horario})   
    }

    return (
        <div className="w-96 h- bg-gray-900 text-white flex items-center justify-center flex-col">
            <div>
                <h1 className="text-3xl font-bold">Agende um atendimento</h1>
                <p>Selecione data, horário e informe o nome do cliente para criar o agendamento</p>
            </div>
            <select value={formularioAgendamento.data} name="Data" id="Datas" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFormularioAgendamento({...formularioAgendamento, data: event.target.value})}>
                <option  value="Data1">Data1</option>
                <option value="Data2">Data2</option>
                <option value="Data3">Data3</option>
            </select>
            <div >
                <h4 className="font-bold">Horários</h4>
                <HorariosDoPeriodo horarioSelecionado = {formularioAgendamento.horario} aoSelecionarHorario = {aoSelecionarHorario} titulo="Manhã" horarios={['09:00', '10:00', '11:00', '12:00']}></HorariosDoPeriodo>
                <HorariosDoPeriodo horarioSelecionado = {formularioAgendamento.horario} aoSelecionarHorario = {aoSelecionarHorario} titulo="Tarde" horarios={['13:00', '14:00', '15:00', '16:00', '17:00', '18:00']}></HorariosDoPeriodo>
                <HorariosDoPeriodo horarioSelecionado = {formularioAgendamento.horario} aoSelecionarHorario = {aoSelecionarHorario} titulo="Noite" horarios={['19:00', '20:00', '21:00']}></HorariosDoPeriodo>
                <h4>Cliente</h4>
                <input type="text" value={formularioAgendamento.nome} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFormularioAgendamento({...formularioAgendamento, nome: event.target.value})}/>
            </div>
        </div>
    )
}