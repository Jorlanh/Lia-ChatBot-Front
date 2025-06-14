import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Orcamento() {
  const orcamentoData = {
    labels: ['Recursos Materiais', 'Recursos Tecnológicos', 'Recursos Humanos', 'Infraestrutura', 'Recursos de Apoio'],
    datasets: [
      {
        label: 'Distribuição do Orçamento',
        data: [48000, 22000, 20000, 11000, 1500],
        backgroundColor: ['#f59e0b', '#fcd34d', '#fbbf24', '#d97706', '#fef3c7'],
        borderColor: '#f8fafc',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#475569',
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(context.parsed);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <section id="orcamento" className="py-20" tabIndex={-1}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">Análise de Recursos e Orçamento</h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            A viabilidade do projeto se baseia em uma alocação de recursos planejada. Veja a distribuição do orçamento total de R$102.500,00.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="chart-container" aria-label="Gráfico de distribuição do orçamento">
              <Doughnut data={orcamentoData} options={options} />
              <p id="orcamentoChartDesc" className="sr-only">
                Gráfico de pizza mostrando a distribuição do orçamento entre recursos materiais, tecnológicos, humanos, infraestrutura e apoio.
              </p>
            </div>
          </div>
          <div className="lg:col-span-3 space-y-4">
            <div aria-labelledby="recursos-materiais" className="bg-white p-4 rounded-lg shadow-sm" role="region">
              <h4 id="recursos-materiais" className="font-bold text-slate-800">
                Recursos Materiais: R$ 48.000,00
              </h4>
              <p className="text-sm text-slate-600">
                Equipamentos como notebooks, impressora 3D e kits de eletrônica para as oficinas.
              </p>
            </div>
            <div aria-labelledby="recursos-tecnologicos" className="bg-white p-4 rounded-lg shadow-sm" role="region">
              <h4 id="recursos-tecnologicos" className="font-bold text-slate-800">
                Recursos Tecnológicos: R$ 22.000,00
              </h4>
              <p className="text-sm text-slate-600">
                Licenças de softwares especializados e plataformas online adaptadas.
              </p>
            </div>
            <div aria-labelledby="recursos-humanos" className="bg-white p-4 rounded-lg shadow-sm" role="region">
              <h4 id="recursos-humanos" className="font-bold text-slate-800">
                Recursos Humanos: R$ 20.000,00
              </h4>
              <p className="text-sm text-slate-600">
                Remuneração para coordenador, instrutor, terapeuta e desenvolvedor.
              </p>
            </div>
            <div aria-labelledby="infraestrutura" className="bg-white p-4 rounded-lg shadow-sm" role="region">
              <h4 id="infraestrutura" className="font-bold text-slate-800">
                Infraestrutura: R$ 11.000,00
              </h4>
              <p className="text-sm text-slate-600">
                Adaptação de espaços físicos, rampas, sinalização e banheiros acessíveis.
              </p>
            </div>
            <div aria-labelledby="recursos-apoio" className="bg-white p-4 rounded-lg shadow-sm" role="region">
              <h4 id="recursos-apoio" className="font-bold text-slate-800">
                Recursos de Apoio: R$ 1.500,00
              </h4>
              <p className="text-sm text-slate-600">
                Custos para biblioteca de empréstimos e apoio de voluntários.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}