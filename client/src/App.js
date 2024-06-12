import './App.css';
import {BrowserRouter} from 'react-router-dom'
import { MyRouting } from './MyRouting';
import { Provider } from 'react-redux';
import store from './REDUX/store';


function App() {
  return (
  //data satisfaction
    <Provider store={store}>
      <BrowserRouter>
        <MyRouting/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
