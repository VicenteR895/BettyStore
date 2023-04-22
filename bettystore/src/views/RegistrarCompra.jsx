import React, { useState, useEffect } from "react";
import { Form, Input, Button, Col, Row, DatePicker, Table, AutoComplete } from "antd";
import dayjs from "dayjs";
import { ShoppingCartOutlined } from '@ant-design/icons'
import axios from "axios";

export default function RegistrarCompra() {


  //COMPONENTE BUSCADOR
  const [productos, setProductos] = useState([{
    codProd: '',
    nomProd: '',
    precioProd: '',
    cantidadProd: '',
  }]);

  const [datos, setDatos] = useState([{
    codProd: '',
    nomProd: '',
    precioProd: '',
    cantidadProd: '',
  }]);

  const [seleccionado, setSeleccionado] = useState({});

  const peticionGet = async () => {
    await axios.get("http://localhost/IndexConsultasSegundoSprint/indexConsultaSimple.php")
      .then(response => {
        setProductos(response.data);
        setDatos(response.data);
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    peticionGet();
  }, [])

  function handleSelect(selectedValue, selectedOption) {
    setSeleccionado(selectedOption);
  }

  function handleSearch(busqueda) {
    const filtrado = datos.filter((producto) =>
      filtrarOpciones(busqueda, producto)
    );
    setProductos(filtrado);
  }

  function filtrarOpciones(busqueda, producto) {
    return producto.nomProd.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1;
  }

  function mostrarSeleccionado() {
    console.log(seleccionado);
  }



  //COMPONENTE FORMULARIO
  const { Item } = Form;

  //Valor de fecha seleccionada
  const handleChangeDate = (value) => {
    const date = dayjs(value).format(dateFormatList[0]);
    console.log(value);
    /*producto['fechaProd'] = date;*/
  }

  //Bloquear fechas menores a la actual
  const disabledDate = (current) => {
    // Can not select days before today and today

    return current && current < dayjs();
  };

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];




  //COMPONENTE TABLA DETALLE DE COMPRAS
  //Columnas tabla Detalle de compras
  const columnas = [
    { title: 'Código', dataIndex: 'codDetCompra', key: 'CodDetCompra' },
    { title: 'Nombre', dataIndex: 'nomDetCompra', key: 'nomDetCompra', },
    { title: 'Precio', dataIndex: 'precioDetCompra', key: 'precioDetCompra', },
    { title: 'Cantidad', dataIndex: 'cantDetCompra', key: 'cantDetCompra', },
    { title: 'Fecha', dataIndex: 'fechaDetCompra', key: 'fechaDetCompra', },
  ];

  return (
    <div>
      <Row>
        <h1>Registrar Compra</h1>
      </Row>
      <Row>
        {/*<Layout></Layout>*/}
        <Col lg={2}></Col>
        <Col lg={20} className="componentsContainer">
          <Row>
            {/* Buscador de inventario */}
            <AutoComplete
              style={{ width: 800 }}
              options={productos.map((producto) => ({ value: producto.nomProd, cantidadProd: producto.cantidadProd, precioProd: producto.precioProd, codProd: producto.codProd }))}
              onSelect={handleSelect}
              placeholder="Busque un producto del inventario"
              onSearch={handleSearch}
            >
              <Input
                size="large"
              />
            </AutoComplete>
            {/* Boton para mostrar el producto seleccionado por consola */}
            <Button onClick={mostrarSeleccionado}>Mostrar seleccionado por consola</Button>
          </Row>
          <p></p> {/* Esto estaría bien así o manejarlo como una Row*/}
          <Row>
            <Col lg={12}>
              <Item
                label="Producto Seleccionado: "
              >
                <Input
                  style={{ color: "#676767" }}
                  disabled
                  placeholder="Ningun producto seleccionado"
                  value={seleccionado.value}>
                </Input>
              </Item>
            </Col>
            <Col lg={2}></Col>
            <Col lg={6} >
              <Item
                label="Fecha de Compra"
                name="fechaCompra"
                rules={[{
                  required: true,
                  message: "Por favor, seleccione una fecha",
                },]}
              >
                <DatePicker name="fechaProd"
                  placeholder="DD/MM/AAAA"
                  disabledDate={disabledDate}
                  format={dateFormatList}
                  onChange={handleChangeDate} />
              </Item>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <Item
                label="Cantidad: "
              >
                <Input
                  className="cantidadProducto"
                  name="cantProd"
                  placeholder="#"
                  maxLength={3}
                />
              </Item>
            </Col>
            <Col lg={2}></Col>
            <Col lg={6} >
              {/* Boton Agregar al detalle de compras */}
              <Button
                icon={<ShoppingCartOutlined />} >Agregar
              </Button>
            </Col>
          </Row>
        </Col>
        <Col lg={2}></Col>
      </Row>
      <Row>
        {/*<Layout></Layout>*/}
        <Col lg={2}></Col>
        <Col lg={20} className="componentsContainer">
          {/* Tabla detalle de compras */}
          <h2 className='subtituloTablaDetalleCompras'>Detalle de compra</h2>
          <Table className='tabla' locale={{ emptyText: 'No hay compras' }} rowKey='id' columns={columnas} bordered={true} pagination={{ pageSize: 4, pagination: true, position: ["bottomRight"] }} size={'small'}></Table>
        </Col>
        <Col lg={2}></Col>
      </Row>


    </div>
  )

}