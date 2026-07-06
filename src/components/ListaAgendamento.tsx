import type { Agendamento } from "../types/Agendamento";


interface ListaAgendamentosProps {
    agendamentos: Agendamento[];
    excluirAgendamento: (idAgendamento: number) => void;
}

interface PeriodoAgendamentosProps {
    titulo: string;
    agendamentos: Agendamento[];
}