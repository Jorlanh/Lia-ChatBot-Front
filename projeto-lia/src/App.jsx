import Chat from './components/Chat';
import Header from './components/Header';
import Inicio from './components/Inicio';
import Projeto from './components/Projeto';
import Metodologia from './components/Metodologia';
import Orcamento from './components/Orcamento';
import Impacto from './components/Impacto';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Inicio />
        <Projeto />
        <Metodologia />
        <Orcamento />
        <Impacto />
      </main>
      <Footer />
      <Chat />
    </>
  );
}

export default App;