import { Route, Switch } from 'react-router-dom';

import { APP_PROVIDER } from './context/state';

import Home from './screens/home';
import Quote from './screens/quote';

function App() {
  return (
    <APP_PROVIDER>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/quote/:weight/:starting_country/:destination_country/:pickup_location?" component={Quote} exact />
      </Switch>
    </APP_PROVIDER>
  );
}

export default App