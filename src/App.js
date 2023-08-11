import logo from './logo.svg';
import './App.css';
import { PersonaNameDisplay } from './state-example/PersonNameDisplay';
import { PersonDetailsDisplay } from './state-example/PersonDetailsDisplay';
import { PersonDataForm } from './state-example/PersonDataForm';
import { setAutoFreeze } from 'immer';

setAutoFreeze(false);

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <PersonDataForm/>
      <PersonaNameDisplay/>
      <PersonDetailsDisplay/>
      
        <img src={logo} className="App-logo" alt="logo" />
        An small example for state
      </header>
 
    </div>
  );
}

export default App;
