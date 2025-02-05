import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ManageUser from './layouts/ManageUser/ManageUser';
import Navigator from './layouts/Navigator';
import ManageLifePost from './layouts/LifePost/ManageLifePost';
import ManageAnnounce from './layouts/Announcement/ManageAnnounce';
import ManageAdmin from './layouts/ManageAdmin/ManageAdmin'
import Login from './layouts/Login/Login';
import NotFound from './layouts/NotFound';
import Home from './layouts/Home';
import ManageForumPost from './layouts/Forum/ManageForumPost';
import ManageSecondPost from './layouts/SecondHand/ManageSecondPost'
import { Redirect } from 'react-router-dom';
import AnnouncementAdd from './layouts/Announcement/AnnouncementAdd';
import AnnouncementUpdate from './layouts/Announcement/AnnouncementUpdate';

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
    backgroundColor: '#8d9da8', 
    width: '100%',              
    padding: '0px 300px',            
    boxSizing: 'border-box'      

  };
  return (
    <>
      {isLoggedIn && <Navigator />}
      <div className="container-fluid" style={customStyle}>
        <div className="d-flex justify-content-center">
          {/* <div className="col-md-10" style={{marginLeft: 'auto', marginRight: 'auto' }}> */}
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
                  <Route path='/secondPost/page'>
                    <ProtectedRoute>
                      <ManageSecondPost/>
                    </ProtectedRoute>
                  </Route>

                  <Route path='/manageAnnounce/add'>
                    <ProtectedRoute>
                      <AnnouncementAdd/>
                    </ProtectedRoute>
                  </Route>

                  <Route path='/manageAnnounce/update/:id'>
                    <ProtectedRoute>
                      <AnnouncementUpdate/>
                    </ProtectedRoute>
                  </Route>

                  <Route><NotFound /></Route>
                </Switch>
              </Router>
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default App;
