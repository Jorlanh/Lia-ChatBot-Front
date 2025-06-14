import { useEffect } from 'react'

export default function Metodologia() {
  const timelineData = [
    {
      date: '08/03/2025 - 14/03/2025',
      title: 'Planejamento Inicial',
      description: 'Planejamento e organização inicial do projeto.',
      phase: 1,
    },
    {
      date: '15/03/2025 - 01/04/2025',
      title: 'Fase 1: Diagnóstico',
      description: 'Levantamento de dados, mapeamento de barreiras e diagnóstico de necessidades.',
      phase: 1,
    },
    {
      date: '02/04/2025 - 07/04/2025',
      title: 'Planejamento das Oficinas',
      description: 'Estruturação das ações educativas e de capacitação.',
      phase: 2,
    },
    {
      date: '08/04/2025 - 15/05/2025',
      title: 'Fase 2: Intervenção',
      description: 'Execução das oficinas de capacitação em duas fases e desenvolvimento do chatbot.',
      phase: 2,
    },
    {
      date: '16/05/2025 - 22/05/2025',
      title: 'Fase 3: Avaliação e Encerramento',
      description: 'Apresentação de resultados, elaboração do relatório final e autoavaliação.',
      phase: 3,
    },
  ]

  useEffect(() => {
    const timelineContainer = document.getElementById('timeline-container')
    if (timelineContainer) {
      timelineContainer.innerHTML = ''
      const now = new Date()

      timelineData.forEach((item) => {
        const startDate = new Date(item.date.split(' - ')[0].split('/').reverse().join('-'))
        const endDate = new Date(item.date.split(' - ')[1].split('/').reverse().join('-'))
        endDate.setDate(endDate.getDate() + 1)

        const isActive = now >= startDate && now < endDate

        const itemDiv = document.createElement('div')
        itemDiv.className = `timeline-item relative mb-8 pl-8 pb-8 border-l-4 ${
          isActive ? 'border-amber-500' : 'border-slate-200'
        }`
        if (isActive) {
          itemDiv.classList.add('active')
        }
        itemDiv.setAttribute('role', 'listitem')
        itemDiv.setAttribute('tabindex', '0')

        itemDiv.innerHTML = `
          <p class="text-sm font-semibold text-amber-600">${item.date}</p>
          <h4 class="mt-1 text-xl font-bold text-slate-800">${item.title}</h4>
          <p class="mt-2 text-slate-600">${item.description}</p>
        `
        timelineContainer.insertBefore(itemDiv, timelineContainer.firstChild)
      })

      const items = Array.from(timelineContainer.children)
      items.reverse().forEach((item) => timelineContainer.appendChild(item))

      if (timelineContainer.lastChild) {
        timelineContainer.lastChild.classList.remove('border-l-4')
        timelineContainer.lastChild.classList.add('border-transparent')
      }
    }
  }, [])

  return (
    <section id="metodologia" className="py-20 bg-slate-100" tabIndex={-1}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">Metodologia e Cronograma</h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Nossa abordagem é a pesquisa-ação, dividida em fases claras para garantir a transformação da realidade estudada. Acompanhe nosso cronograma de execução.
          </p>
        </div>
        <div
          id="timeline-container"
          className="relative max-w-2xl mx-auto border-l-4 border-slate-200 pl-8"
          role="list"
          aria-label="Cronograma do projeto"
        ></div>
      </div>
    </section>
  )
}