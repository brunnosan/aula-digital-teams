import { InputText } from 'primereact/inputtext';
        
const Header = () => {
  return (
    <header className='flex align-items-center gap-3 px-8'>
      <div className="logo">
        <h1>LOGO</h1>
      </div>
      <div className="pesquisa relative w-4">
        <i className='pi pi-search absolute z-index-1 right-0 top-50 -mt-2 mr-3'></i>
        <InputText className='w-full' placeholder='Pesquisar por nome' />
      </div>
    </header>
  );
}
 
export default Header;