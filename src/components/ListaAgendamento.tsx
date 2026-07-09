import type { Agendamento } from "../types/Agendamento";
import React, { useState } from "react";
import { TrashIcon, SunHorizonIcon, CloudSunIcon, MoonStarsIcon  } from "@phosphor-icons/react";

interface ListaAgendamentosProps {
    agendamentos: Agendamento[];
    excluirAgendamento: (idAgendamento: number) => void;
}

interface PeriodoAgendamentosProps {
    titulo: string;
    agendamentos: Agendamento[];
    excluirAgendamento: (idAgendamento: number) => void;
}

function PeriodoAgendamento({titulo, agendamentos, excluirAgendamento}: PeriodoAgendamentosProps){

    function handleExcluir(idAgendamento: number){
        excluirAgendamento(idAgendamento)
    }

    let icone
    let intervalo = ""
    if(titulo.toLowerCase() === "manhã"){
        intervalo = "09h-12h"
         icone = <SunHorizonIcon size={32} color="currentColor" className="text-brand-1"/>
    } else if(titulo.toLowerCase() === "tarde") {
        intervalo = "13h-18h"
         icone = <CloudSunIcon size={32} color="currentColor" className="text-brand-1"/>
    } else {
        intervalo = "19h-21h"
         icone = <MoonStarsIcon size={32} color="currentColor" className="text-brand-1"/>
    }

    return (
            <div className="border-2 rounded-lg my-5 border-base-5 flex flex-col">
                <div className="flex justify-between items-center gap-4 px-2 py-2">
                    <p className="flex gap-3 justify-between items-center">{icone} {titulo}</p>
                    <p>{intervalo}</p>
                </div>
                <hr className="border-base-5 my-1" />
                    <div>
                        {agendamentos.map(agendamento => {
                            return (
                                <div key={agendamento.idAgendamento} className="flex items-center justify-between gap-4 py-2 px-2">
                                    <div className="flex gap-4">
                                        <p>{agendamento.horario}</p>
                                        <p>{agendamento.nome}</p>
                                    </div>
                                    <button className='pr-3 cursor-pointer' onClick={() => handleExcluir(agendamento.idAgendamento)}>
                                        <TrashIcon size={30} color="currentColor" className="text-brand-1 hover:text-brand-2" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
            </div>
    )
}

export function ListaAgendamento({agendamentos, excluirAgendamento}: ListaAgendamentosProps){
    const [dataSelecionada, setDataSelecionada] = useState<string>("Data1")

    const agendamentosPorData = agendamentos.filter(a => a.data === dataSelecionada)
    const agendamentosManha = agendamentosPorData.filter(a => a.periodo.toLowerCase() === "manhã");
    const agendamentosTarde = agendamentosPorData.filter(a => a.periodo.toLowerCase() === "tarde");
    const agendamentosNoite = agendamentosPorData.filter(a => a.periodo.toLowerCase() === "noite");

    return (
        <div className="bg-base-8 text-base-1 flex flex-col w-full px-21 py-16 lg:px-64 lg:py-48 h-screen overflow-y-auto ">
            <div className="flex justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Sua Agenda</h1>
                    <p className="py-3">Consulte os seus cortes de cabelo agendados por dia</p>
                </div>
                <select className='border-base-5 border-2 rounded-lg h-10' name="DatasLista" id="DatasLista" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setDataSelecionada(event.target.value)}>
                                <option className="bg-base-5" value="Data1">Data1</option>
                                <option className="bg-base-5" value="Data2">Data2</option>
                                <option className="bg-base-5" value="Data3">Data3</option>
                </select>
            </div>
                <div>
                    {agendamentosPorData.length === 0 ? (
                        <p className="text-center text-base-4 my-8 font-medium">
                            Não há cortes de cabelo agendados para este dia.
                        </p>
                    ) : (
                        <>
                            {agendamentosManha.length > 0 && (
                                <PeriodoAgendamento agendamentos={agendamentosManha} excluirAgendamento={excluirAgendamento} titulo="Manhã"  />
                            )}
                            {agendamentosTarde.length > 0 && (
                                <PeriodoAgendamento agendamentos={agendamentosTarde} excluirAgendamento={excluirAgendamento} titulo="Tarde" />
                            )}
                            {agendamentosNoite.length > 0 && (
                                <PeriodoAgendamento agendamentos={agendamentosNoite} excluirAgendamento={excluirAgendamento} titulo="Noite" />
                            )}
                        </>
                    )}
                </div>
        </div>
    ) 
}