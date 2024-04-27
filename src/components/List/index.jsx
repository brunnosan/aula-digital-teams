import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useEffect, useState, useRef, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { useForm } from 'react-hook-form';
import { FilterContext } from '../../App';


const List = () => {

  const [mostrarSidebar, setMostrarSidebar] = useState(false);
  const [mostrarSidebarAdd, setMostrarSidebarAdd] = useState(false);
  const [mostrarDialog, setMostrarDialog] = useState(false);
  const [teams, setTeams] = useState([]); //Lista de teams usada comumente no projeto
  const teamSelected = useRef();
  //Variáveis utilizadas para filtrar os teams da lista
  //Considera o filtro passado via contexto e preenchido no Header
  //Lembrando que, por usar o useContext, ele já atribui um valor para a variável recém criada
  const { filter } = useContext(FilterContext);
  const [teamsFiltered, setTeamsFiltered] = useState([]); //Lista de teams a ser usada durante filtros

  //Forma de usar o react-hook-form
  //Para evitar que se crie um useRef para cada campo de um formulãrio (no caso, do formulário do sidebar)
  //Os hooks interferem no ciclo de vida do componente (exceto o useRef)
  //Os hooks normalmente usam "use" no começo de uma função para mostrar que indica um hook
  //As funções "normais" são diferentes do hook por também não interferir no ciclo de vida do componente

  //Para evitar criar uma variável que tenha o objeto do hook-form, a sugestão é já criar o objeto desestruturado
  //  caso contrário, seria usado variavel.register e se escreveria mais
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      id: '',
      nome: '',
      capacidade: 0,
      participante: []
    }
  });

  const { register: registerP, handleSubmit: handleSubmitP, reset: resetP, setValue: setValueP } = useForm();

  async function cadastrar(dados) {
    const request = await fetch('http://localhost:3000/teams', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(dados)
    })

    const response = await request.json();
    // console.log(response);
    // setTeams(response);
    if (response) {
      reset();
      buscarTeams();
      setMostrarSidebar(false);
    }
  }

  async function cadastrarP(dados) {
    const team = teams.find(team => team.id == dados.id);
    team.participante.push(dados.nome);
    const request = await fetch(`http://localhost:3000/teams/${dados.id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(team)
    })
    const response = await request.json();
    if (response) {
      resetP();
      buscarTeams();
    }
    // setMostrarSidebarAdd(false);
  }

// ---------------------------------------------------------
  async function excluirP(dados) {
    const team = teams.find(team => team.id = dados.id);
  }
// ---------------------------------------------------------

function confirmacao(id) {
    confirmDialog ({
      header: 'Aviso',
      message: 'Deseja realmente apagar este item?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: async () => {
        await fetch(`http://localhost:3000/teams/${id}`, {
          method: 'delete'
        }).then(() => {  //finally do fetch é semelhante ao finally do try..catch, sempre é executado no final
          buscarTeams();
        })
      },
      reject: () => {alert('cancelado')}
    })
  }

  const titulo = (nome, id) => (
    <div className='flex justify-content-between align-items-center text-lg'>
      {nome}
      <i className='pi pi-eye cursor-pointer'
        onClick={() => {
          teamSelected.current = id;
          setMostrarDialog(true)
        }}>
      </i>
    </div>
  )

  //Para que o botão delete receba o id como parâmetro, transforme o footer num arrow function
  const footer = (id) => (
    <div className='flex gap-3'>
      <Button label='Adicionar' className='flex-1 px-0' onClick={() => {
          setValueP('id', id);
          setMostrarSidebarAdd(true);
        }}
      />
      <Button icon='pi pi-trash' onClick={() => confirmacao(id)} />
      {/* Se a função receber parâmetro, precisa abrir uma arrow function, caso contrário, pode só nomear a função */}
    </div>
  )

  async function buscarTeams() {
    const request = await fetch("http://localhost:3000/teams");
    const response = await request.json();
    setTeams(response);
  }

  // Função acionada com useEffect não é acionada em toda atualização do componente
  // Função acionada com useState é força a atualização do componente a cada mudança
  // Quando o array de dependência estiver vazio, ele só executa no início
  useEffect(() => {
    buscarTeams();
  }, [])

  useEffect(() => {
    if (filter != "") {
      setTeamsFiltered([...teams.filter((team) => team.nome.toLowerCase().includes(filter.toLowerCase()))]);
      return;
    }
    setTeamsFiltered(teams)
  }, [filter, teams])

  return (
    // gap-3 = 1rem que equivale a 16px
    <section className='flex flex-wrap gap-3 px-8'>
      <h2 className='w-full flex align-items-center justify-content-between'>
        Teams {filter}
        <Button label='novo team' icon='pi pi-plus' onClick={() => setMostrarSidebar(true)} />
      </h2>
      {/* por conta do gap-3 que equivale a 16px, entre cada card tem 16px de espaçamento
          como são 5 cards desejados, tem 16 x 4 = 64 px
          pro calc, coloque 64 / 5 e arredonde pra cima pra descontar dos 20% (que 100% / 5 cards)
       */
      }
      {
        // teams && teams.map((team) => (
        teamsFiltered && teamsFiltered.map((team) => (
          <Card key={`team${team.id}`} style={{width: 'calc(20% - 13px)'}} title={() => titulo(team.nome, team.id)} footer={() => footer(team.id)}>
              <h1 className='mx-auto text-5xl flex flex-column text-center border-circle m-auto h-6rem w-6rem justify-content-center bg-primary'>
                {team.participante.length} <span className='text-sm'>/ {team.capacidade}</span>
              </h1>
            </Card>
          ))
      }

      <Sidebar
        visible={mostrarSidebar}
        onHide={() => setMostrarSidebar(false)}
        position='right'
      >
        <form onSubmit={handleSubmit(cadastrar)}>
          <h3>Cadastrar</h3>
          <label htmlFor="nome" className='uppercase text-sm font-bold mb-2 block'>Nome</label>
          <InputText
            id="nome"
            placeholder='Digite o nome do time'
            className='w-full mb-3'
            {...register('nome', {required: true})}
          />
          <label htmlFor="capacidade" className='uppercase text-sm font-bold mb-2 block'>Capacidade</label>
          <InputMask
            id="capacidade"
            mask={'99'}
            className="w-full mb-3"
            {...register('capacidade', {required: true})}
          />
          <Button
            label="Criar"
            className="w-full"
          />
        </form>
      </Sidebar>

      <Sidebar
        visible={mostrarSidebarAdd}
        onHide={() => setMostrarSidebarAdd(false)}
        position='right'
      >
        <form onSubmit={handleSubmitP(cadastrarP)}>
          <h3>Adicionar</h3>
          <input type="hidden" {...registerP('id')} />
          <label htmlFor="nome" className='uppercase text-sm font-bold mb-2 block'>Nome</label>
          <InputText
            id="nome"
            placeholder='Digite o nome do participante'
            className='w-full mb-3'
            {...registerP('nome', {required: true})}
          />
          <Button
            label="Criar"
            className="w-full"
          />
        </form>
      </Sidebar>

      <Dialog
        visible={mostrarDialog}
        onHide={() => setMostrarDialog(false)}
        style={{ width: '25%'}}
        position='bottom'
        header={<h4>{teamSelected.current && teams.find(team => team.id == teamSelected.current).nome}</h4>}
      >
        {/* <h3>Lista de participantes do time</h3> */}
        {
          teamSelected.current && teams.find(team => team.id == teamSelected.current).participante.map((p, index) => (
            <p className='flex justify-content-between' key={index}>
              {p} <i className='pi pi-trash'></i>
            </p>
          ))
        }
      </Dialog>

      <ConfirmDialog />
    </section>
  );
}
 
export default List;