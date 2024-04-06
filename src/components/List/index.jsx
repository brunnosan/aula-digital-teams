import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const List = () => {

  const titulo = (
    <div className='flex justify-content-between'>
      título do card
      <i className='pi pi-eye'></i>
    </div>
  )

  const footer = (
    <div className='flex gap-3'>
      <Button label='Adicionar' className='flex-1' />
      <Button icon='pi pi-trash' />
    </div>
  )
  return (
    <>
      <Card title={titulo} footer={footer}>
        <h1 className='mx-auto flex flex-column text-center'>0 <span className='text-sm'>/ 0</span></h1>
      </Card>
      <Card title={titulo}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nobis officiis illo reiciendis id tenetur tempore eligendi dolore nostrum illum tempora nemo, in unde! Nulla molestias maxime fuga libero incidunt!</p>
      </Card>
    </>
  );
}
 
export default List;