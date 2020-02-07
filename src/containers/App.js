import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

// if server went down or redux store was cleared, it will see a token is still in local storage
// then the token would be readded to the header without having to log back in
if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually tampering with the key in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
  }
}

// a stateless component so just using a function, which create-react-app does by default anyway
const App = () => (
  <Provider store={store}>
    <Router>
      <div className='onboarding'>
        <Navbar />
        {/* Main contains the routes */}
        <Main />
      </div>
    </Router>
  </Provider>
)

export default App;
