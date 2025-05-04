import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Addalumini from './component/Clgmange/Addalumini';
import Layout from './component/Layout/Layout';
import PageNotFound from './component/PageNotFound';
import AddInstitute from './component/Clgmange/Addinstitute';
import Home from './component/Home';
import Institute from './component/Institute';
import Alumni from './component/Alumni';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="/institute/:detail" element={<Institute />} /> 
        </Route>
        <Route path="/alumni/:detail" element={<Alumni/>} />
        <Route path="/Addinstitute" element={<AddInstitute  />} />
        <Route path="/Addalumini" element={<Addalumini />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
