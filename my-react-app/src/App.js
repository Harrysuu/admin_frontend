import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ManageUser from './layouts/ManageUser/ManageUser';
import Navigator from './layouts/Navigator';
import ManageLifePost from './layouts/ManageLifePost';
import ManageAnnounce from './layouts/ManageAnnounce';
import ManageAdmin from './layouts/ManageAdmin/ManageAdmin'
import Login from './layouts/Login/Login';
import NotFound from './layouts/NotFound';
import Home from './layouts/Home';
import ManageForumPost from './layouts/ManageForumPost';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem('adminId')) {
    return children;
  }
  return <Redirect to='/login/page' />
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('adminId')) {
      setIsLoggedIn(true);
    } else {
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
      {isLoggedIn && <Navigator />}
      <div className="container-fluid" style={customStyle}>
        <div className="d-flex justify-content-center">
          <div className="col-md-10" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div>
              <Router>
                <Switch>
                  <Route path="/login/page" component={Login} />
                  <Route path='/manageUser/page' >
                    <ProtectedRoute>
                      <ManageUser />
                    </ProtectedRoute>
                  </Route>
                  <Route path='/manageLifePost/page'>
                    <ProtectedRoute>
                      <ManageLifePost />
                    </ProtectedRoute>
                  </Route>
                  <Route path='/manageForumPost/page'>
                    <ProtectedRoute>
                      <ManageForumPost />
                    </ProtectedRoute>
                  </Route>
                  <Route path='/manageAnnounce/page'>
                    <ProtectedRoute>
                      <ManageAnnounce />
                    </ProtectedRoute>
                  </Route>
                  <Route path='/manageAdmin/page'>
                    <ProtectedRoute>
                      <ManageAdmin />
                    </ProtectedRoute>
                  </Route>
                  <Route exact path='/'>
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  </Route>
                  <Route><NotFound /></Route>
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
