import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useEffect, useState } from 'react';

const List = () => {

  const [mostrarSidebar, setMostrarSidebar] = useState(false);
  const [mostrarSidebarAdd, setMostrarSidebarAdd] = useState(false);
  const [mostrarDialog, setMostrarDialog] = useState(false);
  const [teams, setTeams] = useState([]);

  const titulo = (
    <div className='flex justify-content-between align-items-center text-lg'>
      título do card
      <i className='pi pi-eye cursor-pointer' onClick={() => setMostrarDialog(true)}></i>
    </div>
  )

  const footer = (
    <div className='flex gap-3'>
      <Button label='Adicionar' className='flex-1 px-0' onClick={() => setMostrarSidebarAdd(true)} />
      <Button icon='pi pi-trash' onClick={confirmacao}/>
      {/* Se a função receber parâmetro, precisa abrir uma arrow function, caso contrário, pode só nomear a função */}
    </div>
  )

  function confirmacao() {
    confirmDialog ({
      header: 'Aviso',
      message: 'Deseja realmente apagar este item?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {alert('confirmado')},
      reject: () => {alert('cancelado')}
    })
  }

  async function buscarTeams() {
    const request = await fetch("http://localhost:3000/teams");
    const response = await request.json;
    setTeams(response);
  }

  // Função acionada com useEffect não é acionada em toda atualização do componente
  // Função acionada com useState é força a atualização do componente a cada mudança
  useEffect(() => {
    buscarTeams();
  })

  return (
    // gap-3 = 1rem que equivale a 16px
    <section className='flex flex-wrap gap-3 px-8'>
      <h2 className='w-full flex align-items-center justify-content-between'>
        Teams
        <Button label='novo team' icon='pi pi-plus' onClick={() => setMostrarSidebar(true)} />
      </h2>
      {/* por conta do gap-3 que equivale a 16px, entre cada card tem 16px de espaçamento
          como são 5 cards desejados, tem 16 x 4 = 64 px
          pro calc, coloque 64 / 5 e arredonde pra cima pra descontar dos 20% (que 100% / 5 cards)
       */}
      <Card style={{width: 'calc(20% - 13px)'}} title={titulo} footer={footer}>
        <h1 className='mx-auto flex flex-column text-center'>0 <span className='text-sm'>/ 0</span></h1>
      </Card>
      <Card style={{width: 'calc(20% - 13px)'}} title={titulo} footer={footer}>
        <h1 className='mx-auto flex flex-column text-center'>0 <span className='text-sm'>/ 0</span></h1>
      </Card>
      <Card style={{width: 'calc(20% - 13px)'}} title={titulo} footer={footer}>
        <h1 className='mx-auto flex flex-column text-center'>0 <span className='text-sm'>/ 0</span></h1>
      </Card>
      <Card style={{width: 'calc(20% - 13px)'}} title={titulo} footer={footer}>
        <h1 className='mx-auto flex flex-column text-center'>0 <span className='text-sm'>/ 0</span></h1>
      </Card>
      <Card style={{width: 'calc(20% - 13px)'}} title={titulo} footer={footer}>
        <h1 className='mx-auto flex flex-column text-center'>0 <span className='text-sm'>/ 0</span></h1>
      </Card>
      <Card style={{width: 'calc(20% - 13px)'}} title={titulo} footer={footer}>
        <h1 className='mx-auto flex flex-column text-center'>0 <span className='text-sm'>/ 0</span></h1>
      </Card>

      <Sidebar
        visible={mostrarSidebar}
        onHide={() => setMostrarSidebar(false)}
        position='right'
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur obcaecati labore, voluptas saepe corrupti magnam temporibus hic eos iure officia adipisci velit ut molestiae eligendi voluptates perspiciatis vero esse alias?
      </Sidebar>

      <Sidebar
        visible={mostrarSidebarAdd}
        onHide={() => setMostrarSidebarAdd(false)}
        position='rigt'
      >
        Sidebar Botão Add
      </Sidebar>

      <Dialog
        visible={mostrarDialog}
        onHide={() => setMostrarDialog(false)}
        style={{ width: '50%'}}
        position='bottom'
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt maiores voluptate velit veritatis assumenda, amet ipsa exercitationem necessitatibus atque ullam porro, ea excepturi sint quod illo reiciendis fuga totam vitae.
      </Dialog>

      <ConfirmDialog />
    </section>
  );
}
 
export default List;