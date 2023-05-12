import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from "axios";
import './TablaComprasStyle.css';
import Footer from '../Footer/Footer';

function TablaCompras() {

  const [datosTablaCompra, setDatosTablaCompra] = useState([]);

  const columnas = [
    { title: 'Código Compra', dataIndex: 'codDetCompra', key: 'CodDetCompra' },
    { title: 'Código Producto', dataIndex: 'producto_codProducto', key: 'producto_codProducto' },
    { title: 'Nombre', dataIndex: 'nomDetCompra', key: 'nomDetCompra', },
    { title: 'Precio (Bs.)', dataIndex: 'precioDetCompra', key: 'precioDetCompra', },
    { title: 'Cantidad', dataIndex: 'cantDetCompra', key: 'cantDetCompra', },
    { title: 'Fecha', dataIndex: 'fechaDetCompra', key: 'fechaDetCompra', },
  ];


  //  Peticion Get de la API usando axios.

  const peticionGet = async () => {
    await axios.get("http://localhost/IndexConsultasSegundoSprint/indexConsultaGeneralCompra.php")
      .then(response => {
        setDatosTablaCompra(response.data);
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  //uso de useEffect para poder llamar a la peticion

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div>
      <h2 className='subtituloTabla'>Compras registradas</h2>
      <Table className='tablasInvComprVentRegistradas' locale={{ emptyText: 'No hay compras registradas' }} rowKey='codDetCompra' columns={columnas} dataSource={datosTablaCompra} bordered={true} pagination={{ pageSize: 7, pagination: true, position: ["bottomRight"] }} size={'middle'}></Table>
      <Footer/>
    </div>
  )
}
export default TablaCompras;