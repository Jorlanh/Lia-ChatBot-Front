import { Users, UserPlus, DollarSign } from 'lucide-react';

export default function Inicio() {
  return (
    <section id="inicio" className="py-20 bg-white" tabIndex={-1}>
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Tecnologia Assistiva: Inovação, Autonomia e Inclusão
        </h2>
        <p className="text-lg md:text-xl text-slate-600 mt-4 max-w-4xl mx-auto">
          Um projeto para promover a inclusão de pessoas com deficiência no Colégio Estadual Governador Roberto Santos através da tecnologia.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            aria-labelledby="impacto-direto"
            className="bg-slate-100 p-6 rounded-xl shadow-sm flex flex-col items-center"
            role="region"
          >
            <Users aria-hidden="true" className="text-amber-500 h-12 w-12" />
            <h3 id="impacto-direto" className="text-4xl font-bold text-slate-800 mt-4">
              100+
            </h3>
            <p className="text-slate-500 mt-2">Pessoas Impactadas Diretamente</p>
          </div>
          <div
            aria-labelledby="impacto-indireto"
            className="bg-slate-100 p-6 rounded-xl shadow-sm flex flex-col items-center"
            role="region"
          >
            <UserPlus aria-hidden="true" className="text-amber-500 h-12 w-12" />
            <h3 id="impacto-indireto" className="text-4xl font-bold text-slate-800 mt-4">
              250+
            </h3>
            <p className="text-slate-500 mt-2">Pessoas Impactadas Indiretamente</p>
          </div>
          <div
            aria-labelledby="orcamento-total"
            className="bg-slate-100 p-6 rounded-xl shadow-sm flex flex-col items-center"
            role="region"
          >
            <DollarSign aria-hidden="true" className="text-amber-500 h-12 w-12" />
            <h3 id="orcamento-total" className="text-4xl font-bold text-slate-800 mt-4">
              R$102.500
            </h3>
            <p className="text-slate-500 mt-2">Orçamento Total Estimado</p>
          </div>
        </div>
      </div>
    </section>
  );
}