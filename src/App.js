import logo from './logo.svg';
import './App.css';
import Header from './mycompo/Header';
import Footer from './mycompo/Footer';
function App() {
  return (
  <>
  <Header title="To-Do" search={true}/>
  <Footer/>
  </>
  );
}

export default App;
