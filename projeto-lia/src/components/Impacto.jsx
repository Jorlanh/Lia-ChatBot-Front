export default function Impacto() {
  return (
    <section id="impacto" className="py-20 bg-slate-100" tabIndex={-1}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">Impacto, Parcerias e Interfaces</h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            O projeto vai além da tecnologia, gerando impacto social, fortalecendo parcerias e atuando em diversas interfaces da vida cotidiana.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div aria-labelledby="impacto-social" className="bg-white p-6 rounded-xl shadow-sm" role="region">
            <h4 id="impacto-social" className="font-bold text-lg text-slate-800 mb-3">
              Impacto Social e Econômico
            </h4>
            <p className="text-slate-600">
              Promove a equidade, reduz barreiras educacionais e de trabalho, e muda a percepção social sobre a deficiência, valorizando potencialidades. A longo prazo, tende a reduzir custos sociais e de saúde.
            </p>
          </div>
          <div aria-labelledby="parcerias-estrategicas" className="bg-white p-6 rounded-xl shadow-sm" role="region">
            <h4 id="parcerias-estrategicas" className="font-bold text-lg text-slate-800 mb-3">
              Parcerias Estratégicas
            </h4>
            <p className="text-slate-600">
              Colaboração com universidades, empresas de tecnologia (Google, Microsoft, Apple), ONGs (APAE, Fundação Dorina Nowill) e órgãos governamentais para garantir a sustentabilidade e o alcance das ações.
            </p>
          </div>
          <div aria-labelledby="interfaces-ta" className="bg-white p-6 rounded-xl shadow-sm" role="region">
            <h4 id="interfaces-ta" className="font-bold text-lg text-slate-800 mb-3">
              Interfaces da TA
            </h4>
            <p className="text-slate-600">
              Aplicações em educação (softwares de leitura, tradutores de Libras), comunicação (pranchas de comunicação), mobilidade (cadeiras de rodas, próteses), ambientes (casas inteligentes) e mercado de trabalho (softwares acessíveis).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}