import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Banner from './components/Navbar/Banner';
import Hero from './components/Hero/Hero';
import Numbercount from './components/Numbercount/Numbercount';
import Whychooseus from './components/Whychooseus/Whychooseus';
import AboutUs from './components/AboutUS/AboutUS';
import Banner1 from './components/banner/Banner1';
import Courses from './components/courses/Courses';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import Teacher_dashboard from './components/Teacher_Dashboard/Teacher_dashboard';
import Admin_Dashboard from './components/Admin_Dashboard/Admin_Dashboard';
import Exam from './components/exam/Exam';
import Recording from './components/recording/Recording';
import Joinclass from './components/join_a_class/Joinclass';
import Consultation from './components/Consultation/Consultation';
import Postlink from './components/Post_link/Postlink';
import Parentapprove from './components/Parent_approve/Parentapprove';
import Sitterapprove from './components/Sitterapprove/Sitterapprove';
import Findsitter from './components/Findsitter/Findsitter';
import Payment from './components/Payment/Payment';
import Paymentwithbkash from './components/Paymentwithbkash/Paymentwithbkash';  
import Updateinfo from './components/Update_info/Updateinfo';
import Updatestat from './components/Updatestat/Updatestat';

const App = () => {
  return (
    <BrowserRouter>
      <main className='overflow-x-hidden'>
        <Routes>
          <Route path="/" element={
            <>
            <Navbar />
              <Banner />
              <Hero />
              <Numbercount />
              <Whychooseus />
              <AboutUs/>
              <Banner1 />
              <Courses />
            </>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Teacher_dashboard" element={<Teacher_dashboard />} />
          <Route path="/Admin_dashboard" element={<Admin_Dashboard />} />
          <Route path="/Exam" element={<Exam />} />
          <Route path="/Dashboard/Recording" element={<Recording />} />
          <Route path="/Dashboard/Joinclass" element={<Joinclass />} />
          <Route path="/Teacher_dashboard/Postlink" element={<Postlink />} />
          <Route path="/Teacher_dashboard/Consultation" element={<Consultation />} />
          <Route path="/Admin_dashboard/Parentapprove" element={<Parentapprove />} />
          <Route path="/Admin_dashboard/Sitterapprove" element={<Sitterapprove />} />
          <Route path="/Dashboard/Findsitter" element={<Findsitter />} />
          <Route path="/Dashboard/Payment" element={<Payment />} />
          <Route path="/Dashboard/Payment/Paymentwithbkash" element={<Paymentwithbkash />} />
          <Route path="/Teacher_dashboard/Updateinfo" element={<Updateinfo />} />
          <Route path="/Teacher_dashboard/Updatestat" element={<Updatestat />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App
