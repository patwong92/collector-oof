import React from 'react';
import './App.scss';
import { MTGCollection } from './components/MTGCollection';
import { Navbar, Image, Jumbotron, Tab, Tabs } from 'react-bootstrap'

function App() {
  return (
    <>
      <Navbar bg='dark' expand='lg'>
        <Image className='logo-img' src="logo.png" rounded />
        <Navbar.Brand >
          <h1 className='title'>Collector Oof</h1>
        </Navbar.Brand>
      </Navbar>
      <Jumbotron>
        <Tabs defaultActiveKey="home" id="tab">
          <Tab eventKey="home" title="Home">
            <div className='content-text'>This application displays your Magic the Gathering card collection 
            and prices them according to 80% of the sales price from facetofacegames</div>
          </Tab>
          <Tab eventKey="my-collection" title="My Collection">
            <div className='content-text'>
              <MTGCollection />
            </div>
          </Tab>
        </Tabs>
      </Jumbotron>
    </>
  );
}

export default App;
