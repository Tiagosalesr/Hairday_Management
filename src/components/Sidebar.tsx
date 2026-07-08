import React, { useState } from "react";
import type { Agendamento } from "../types/Agendamento";
import { UserRectangleIcon, CalendarBlankIcon  } from "@phosphor-icons/react";


interface SidebarProps {
    aoAdicionarAgendamento: (agendamento: Agendamento) => void;
    agendamentos: Agendamento[]
}

interface HorariosDoPeriodoProps {
    aoSelecionarHorario: (horario: string) => void;
    titulo: string;
    horarios: string[];
    horarioSelecionado: string;
    agendamentos: Agendamento[]
    dataSelecionada: string;
}

function HorariosDoPeriodo({horarioSelecionado, titulo, horarios, aoSelecionarHorario, agendamentos, dataSelecionada}: HorariosDoPeriodoProps){
        return (
            <div>
                <p className="py-3">{titulo}</p>
                {horarios.map(horario => {
                    const estaSelecionado = horario === horarioSelecionado;
                    const horarioAgendado = agendamentos.some(a => a.horario === horario && a.data === dataSelecionada)
                    return (
                            <>
                            {!horarioAgendado &&
                                <button
                                    key={horario}
                                    className={estaSelecionado ? "m-2 w-25 h-12 bg-base-6 text-brand-2 border-brand-2 border-2 rounded-xl" : "border-base-5 border-2 m-2 w-25 h-12 rounded-lg cursor-pointer bg-base-6 hover:bg-base-5"}
                                    onClick={() => aoSelecionarHorario(horario)}
                                >
                                    {horario}
                                </button>
                            } 

                            {horarioAgendado &&
                                <button
                                    key={horario}
                                    className="border-base-5 border-2 m-2 w-25 h-12 rounded-xl bg-base-8 text-base-5"
                                    onClick={() => aoSelecionarHorario(horario)}
                                    disabled
                                >
                                    {horario}
                                </button>
                            }
                            </>
                        );
                })}
            </div>
        )
    }



export function Sidebar({aoAdicionarAgendamento, agendamentos}: SidebarProps){
    const[formularioAgendamento, setFormularioAgendamento] = useState<Agendamento>({idAgendamento: 0, nome: '', data: 'Data1', horario: '', periodo: ''})

    function handleAgendar(){
        aoAdicionarAgendamento({...formularioAgendamento})
        setFormularioAgendamento({...formularioAgendamento, idAgendamento: 0, nome: '', horario: '', periodo: ''})
    }

    function aoSelecionarHorario(horario: string){
        setFormularioAgendamento({...formularioAgendamento, horario: horario})   
    }

    return (
        <div className="pt-24 px-14 w-150 h-screen bg-base-7 text-base-1 flex flex-col">
            <div>
                <h1 className="text-3xl font-bold">Agende um atendimento</h1>
                <p className="pt-3 pb-5">Selecione data, horário e informe o nome do cliente para criar o agendamento</p>
            </div>
            <h4 className="font-bold mb-4 mt-6">Data</h4>
            <div className="relative">
                <select className='border-base-5 pl-10 border-2 rounded-lg h-10' value={formularioAgendamento.data} name="Data" id="Datas" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFormularioAgendamento({...formularioAgendamento, data: event.target.value})}>
                    <option className="bg-base-5" value="Data1">Data1</option>
                    <option className="bg-base-5" value="Data2">Data2</option>
                    <option className="bg-base-5" value="Data3">Data3</option>
                </select>
                <CalendarBlankIcon color="currentColor" className="text-brand-1 left-2 top-1/2 -translate-y-1/2 absolute" size={28} />
            </div>
            <div >
                <h4 className="mt-8 mb-3 font-bold">Horários</h4>
                <HorariosDoPeriodo dataSelecionada={formularioAgendamento.data} horarioSelecionado = {formularioAgendamento.horario} aoSelecionarHorario = {aoSelecionarHorario} titulo="Manhã" horarios={['09:00', '10:00', '11:00', '12:00']} agendamentos={agendamentos}></HorariosDoPeriodo>
                <HorariosDoPeriodo dataSelecionada={formularioAgendamento.data} horarioSelecionado = {formularioAgendamento.horario} aoSelecionarHorario = {aoSelecionarHorario} titulo="Tarde" horarios={['13:00', '14:00', '15:00', '16:00', '17:00', '18:00']} agendamentos={agendamentos}></HorariosDoPeriodo>
                <HorariosDoPeriodo dataSelecionada={formularioAgendamento.data} horarioSelecionado = {formularioAgendamento.horario} aoSelecionarHorario = {aoSelecionarHorario} titulo="Noite" horarios={['19:00', '20:00', '21:00']} agendamentos={agendamentos}></HorariosDoPeriodo>
                <h4 className="pt-10 pb-3">Cliente</h4>
                <div className="relative">
                    <input className="border-base-5 pl-12 border-2 rounded-lg h-12 w-full" placeholder="Digite o nome do paciente" type="text" value={formularioAgendamento.nome} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFormularioAgendamento({...formularioAgendamento, nome: event.target.value})}/>
                    <UserRectangleIcon size={32} color="currentColor" className="text-brand-1 absolute left-3 top-1/2 -translate-y-1/2"/>
                </div>
                {!!formularioAgendamento.nome && !!formularioAgendamento.horario ? (
                    <button 
                    className="bg-brand-2 text-base-8 font-bold w-full h-16 rounded-lg mt-8 hover:border-brand-1 border-2 cursor-pointer"
                    onClick={handleAgendar}
                    >
                    AGENDAR
                    </button>
                ) : (
                    <button 
                    className="bg-brand-3 text-base-8 font-bold w-full h-16 rounded-xl mt-8 border-2"
                    onClick={() => {alert("Insira o nome do Cliente e selecione um Horário")}}
                    >
                    AGENDAR
                    </button>
                )
                }
            </div>
        </div>
    )
}