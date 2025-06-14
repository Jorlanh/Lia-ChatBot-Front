import { useEffect } from 'react'

export default function Projeto() {
  useEffect(() => {
    const tabButtons = document.querySelectorAll('.tab-button')
    const infoContents = document.querySelectorAll('.info-content')

    function onClickTab(e) {
      const tab = e.currentTarget.dataset.tab
      tabButtons.forEach((btn) => {
        btn.classList.remove('text-amber-600', 'border-amber-500')
        btn.classList.add('text-slate-500', 'hover:bg-slate-50')
        btn.setAttribute('aria-selected', 'false')
        btn.setAttribute('tabindex', '-1')
      })
      e.currentTarget.classList.add('text-amber-600', 'border-amber-500')
      e.currentTarget.classList.remove('text-slate-500', 'hover:bg-slate-50')
      e.currentTarget.setAttribute('aria-selected', 'true')
      e.currentTarget.setAttribute('tabindex', '0')
      e.currentTarget.focus()

      infoContents.forEach((content) => {
        if (content.id === `${tab}-content`) {
          content.classList.remove('hidden')
          content.setAttribute('tabindex', '0')
        } else {
          content.classList.add('hidden')
          content.setAttribute('tabindex', '-1')
        }
      })
    }

    tabButtons.forEach((btn) => btn.addEventListener('click', onClickTab))
    return () => {
      tabButtons.forEach((btn) => btn.removeEventListener('click', onClickTab))
    }
  }, [])

  return (
    <section id="projeto" className="py-20" tabIndex={-1}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">O Projeto</h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Entenda a motivação, os objetivos e quem se beneficia com esta iniciativa transformadora.
          </p>
        </div>
        <div id="info-container" className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex border-b border-slate-200" role="tablist" aria-label="Seções do projeto">
            <button
              data-tab="justificativa"
              className="tab-button flex-1 p-4 text-center font-semibold text-amber-600 border-b-2 border-amber-500"
              role="tab"
              aria-selected="true"
              aria-controls="justificativa-content"
              id="justificativa-tab"
              tabIndex={0}
            >
              Justificativa
            </button>
            <button
              data-tab="objetivos"
              className="tab-button flex-1 p-4 text-center font-semibold text-slate-500 hover:bg-slate-50"
              role="tab"
              aria-selected="false"
              aria-controls="objetivos-content"
              id="objetivos-tab"
              tabIndex={-1}
            >
              Objetivos
            </button>
            <button
              data-tab="publico"
              className="tab-button flex-1 p-4 text-center font-semibold text-slate-500 hover:bg-slate-50"
              role="tab"
              aria-selected="false"
              aria-controls="publico-content"
              id="publico-tab"
              tabIndex={-1}
            >
              Público Alvo
            </button>
          </div>
          <div className="p-8">
            <div
              id="justificativa-content"
              className="info-content text-slate-700 leading-relaxed"
              role="tabpanel"
              aria-labelledby="justificativa-tab"
            >
              <p>
                Apesar dos avanços legais, barreiras comunicacionais, tecnológicas e sociais ainda dificultam a participação plena de pessoas com deficiência. A Tecnologia Assistiva (TA) é uma aliada crucial, mas seu desconhecimento limita o potencial de inclusão. Este projeto justifica-se pela necessidade de tornar o conhecimento sobre TA acessível à comunidade do Colégio Estadual Governador Roberto Santos, promovendo a autonomia e o empoderamento de pessoas com deficiência e suas redes de apoio.
              </p>
            </div>
            <div
              id="objetivos-content"
              className="info-content hidden text-slate-700 leading-relaxed"
              role="tabpanel"
              aria-labelledby="objetivos-tab"
              tabIndex={0}
            >
              <h4 className="font-bold text-lg mb-2 text-slate-800">Objetivo Geral</h4>
              <p className="mb-6">
                Promover a inclusão e a autonomia de pessoas com deficiência por meio da aplicação e difusão de tecnologias assistivas no Colégio Estadual Governador Roberto Santos.
              </p>
              <h4 className="font-bold text-lg mb-2 text-slate-800">Objetivos Específicos</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Realizar um diagnóstico detalhado das barreiras enfrentadas pela comunidade.</li>
                <li>Desenvolver e implementar o chatbot "LIA" para centralizar informações.</li>
                <li>Capacitar, por meio de oficinas, membros da comunidade escolar sobre o uso de TA.</li>
                <li>Apresentar um relatório de diagnóstico e um guia de boas práticas para a gestão do colégio.</li>
              </ul>
            </div>
            <div
              id="publico-content"
              className="info-content hidden text-slate-700 leading-relaxed"
              role="tabpanel"
              aria-labelledby="publico-tab"
              tabIndex={0}
            >
              <p>
                O projeto beneficiará diretamente pessoas com deficiência (física, sensorial, intelectual e múltipla), suas famílias e redes de apoio. Além disso, atenderá profissionais das áreas de educação, saúde e tecnologia, que atuarão como multiplicadores do conhecimento. Estudantes e voluntários também serão envolvidos, ampliando o alcance e a conscientização sobre inclusão e acessibilidade na comunidade escolar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}