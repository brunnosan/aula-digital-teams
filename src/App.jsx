

import "primereact/resources/themes/lara-light-pink/theme.css";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Header from "./components/Header";
import List from './components/List'
import { createContext, useState } from "react";

//Contexto que será utilizado em múltiplos componentes
//  a variável precisa ser como export porque é possível ter contexto dentro de contexto
//  e precisa ser definido em que contexto aquela variável será usada
export const FilterContext = createContext();

const App = () => {
  const [filter, setFilter] = useState('');

  return (
    <>
      <FilterContext.Provider value={{filter, setFilter}}>
        <Header/>
        <List />
      </FilterContext.Provider>
    </>
  );

}
 
export default App;