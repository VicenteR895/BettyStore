import './App.css';
import { Space, Layout, Col} from 'antd'
import Home from './views/Home';
//import Inventario from './views/RegistrarProducto';

import SideMenu from './components/SideMenu/SideMenu';
import AppHeader from './components/AppHeader/AppHeader';
import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import { Routes, Route } from 'react-router-dom';
import RegistrarProducto from './views/RegistrarProducto';
import MostrarInventario from './views/MostrarInventario';


const {Header, Sider, Footer, Content} = Layout

function displayYear(){
  return new Date().getFullYear()
}

function App() {
  const {contextTheme} = useContext(ThemeContext)
  //const {contextTheme} = useContext(ThemeContext)
  return (
    <Space direction='vertical' className='App-container'>
      <Layout>
        <Header className='App-header' style={{color: contextTheme.color, background: contextTheme.background}}> <AppHeader/> </Header>
        
        <Layout>

            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
            >
            <SideMenu />
            </Sider>

          <Col lg={21}>
            <Content className='App-content'>
                <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/registrarProducto' element={<RegistrarProducto/>}/>
                  <Route path='/mostrarInventario' element={<MostrarInventario/>}/>
                </Routes>     
            </Content>
          </Col>

          

        </Layout> 
        <Footer className='App-footer'><small>UMSS &copy; - Sistema creado por Team Digitial Warriors - Todos los derechos reservados</small> {displayYear()}</Footer>
      </Layout>
    </Space>
  )
}

export default App;
