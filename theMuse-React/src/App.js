
import Login from './Login/Login';
import RegisterPage from './RegisterPage/RegisterPage';
import Detail from './detail/Detail';
import Write from './write/Write';

import EditPage from './write/EditPage';
import TheMuseMain from './TheMuseMain/TheMuseMain';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import SeeAll from './SeeAll/SeeAll';
import AdminListPage from './AdminListPage/AdminListPage';
import { Route } from 'react-router-dom';
import WriteUpdate from './write/WriteUpdate';
import ReturnTop from './ReturnTop';

// import TheMuseMain from './TheMuseMain/TheMuseMain';

function App() {


  return (
    <>
      <div style={{border: '3px solid green', display: 'block', height: 100}}>
      <Header />
      </div>

        <Route path="/themuse/musicallist" component={SeeAll}  exact={true}/>
         <Route path="/themuse"  component={TheMuseMain} exact={true}/>
         <Route path="/regist" component={RegisterPage}  exact={true}/>
         <Route path="/login" component={Login}  exact={true}/>
         <Route path="/themuse/admin" component={AdminListPage}  exact={true}/>
         <Route path="/themuse/admin/write" component={Write}  exact={true}/>
         {/* <Route path="/themuse/admin/detailimg/:musicalIdx" component={DetailImg}  exact={true}/> */}
         <Route path= "/themuse/musicaldetail/:musicalIdx" component={Detail} exact={true} />
         <Route path= "/themuse/admin/updateinfo/:musicalIdx" component={WriteUpdate} exact={true} />
         {/* <Route path= "/accessDenied" component={AccessDenied} exact={true} /> */}
      
      <Footer />
      {/* 위로 가는 버튼 */}
      <ReturnTop/>
    </>
  );
}

export default App;
