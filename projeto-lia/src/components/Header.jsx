import { Accessibility } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm" role="banner">
      <nav
        aria-label="Menu principal"
        className="container mx-auto px-6 py-3 flex justify-between items-center"
        role="navigation"
      >
        <div className="flex items-center space-x-2">
          <div aria-hidden="true" className="bg-amber-500 p-2 rounded-lg">
            <Accessibility className="text-white h-6 w-6" />
          </div>
          <h1 className="font-bold text-xl text-slate-800">Projeto LIA</h1>
        </div>
        <div className="hidden md:flex space-x-8">
          <a
            href="#inicio"
            className="text-slate-600 hover:text-amber-600 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
          >
            Início
          </a>
          <a
            href="#projeto"
            className="text-slate-600 hover:text-amber-600 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
          >
            O Projeto
          </a>
          <a
            href="#metodologia"
            className="text-slate-600 hover:text-amber-600 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
          >
            Metodologia
          </a>
          <a
            href="#orcamento"
            className="text-slate-600 hover:text-amber-600 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
          >
            Orçamento
          </a>
          <a
            href="#impacto"
            className="text-slate-600 hover:text-amber-600 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
          >
            Impacto
          </a>
        </div>
      </nav>
    </header>
  );
}