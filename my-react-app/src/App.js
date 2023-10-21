import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ManageUser from './layouts/ManageUser/ManageUser';
import Navigator from './layouts/Navigator';
import ManageLifePost from './layouts/ManageLifePost';
import ManageAnnounce from './layouts/ManageAnnounce';
import ManageAdmin from './layouts/ManageAdmin'
import Login from './layouts/Login/Login';
import NotFound from './layouts/NotFound';
import Home from './layouts/Home';
import ManageForumPost from './layouts/ManageForumPost';


function App() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {

    // 根据当前路径判断是否为登录页
    const currentPath = window.location.pathname;
    console.log(currentPath)
    if (currentPath === '/login/page') {
      setIsLoginPage(true);
    } else {
      setIsLoginPage(false);
    }
    //
    if (localStorage.getItem('userId')) {
      setIsLoggedIn(true);
    } else{
      setIsLoggedIn(false);
    }
  }, []);

    const customStyle = {
    backgroundColor: '#8d9da8', // 设置背景颜色为深蓝色 #55738a #ccdce8
    width: '100%',               // 设置宽度为100%
    padding: '0px 300px',             // 设置padding值
    boxSizing: 'border-box'      // 使用box-sizing: border-box;

  };
  return (
    <>
    {!isLoginPage && isLoggedIn && <Navigator/>}
      <div className="container-fluid  " style= {customStyle}>
        <div className="d-flex justify-content-center">
          <div className="col-md-10" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div>
              <Router>
                <Switch>
                  <Route path='/manageUser/page' component={ManageUser}/>
                  <Route exact path='/'><Home/></Route>
                  <Route path='/manageLifePost/page' component={ManageLifePost}/>
                  <Route path='/manageForumPost/page' component={ManageForumPost}/>
                  <Route path='/manageAnnounce/page' component={ManageAnnounce}/>
                  <Route path='/manageAdmin/page' component={ManageAdmin}/>
                  {isLoginPage && <Route path="/login/page" component={Login} />}

                  <Route><NotFound/></Route>
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
