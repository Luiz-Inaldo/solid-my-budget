import { createSignal, Match, Switch, useContext, type Component } from 'solid-js';

import styles from './App.module.css';
import { Empty } from './components/Empty';
import { Main } from './components/Main';
import { GlobalContext, GlobalContextProvider, useGlobalContext } from './context/GlobalContext';

const HomeApp: Component = () => {

  const {
    list
  } = useGlobalContext();

  return (
    <div class={styles.App}>
      <Switch fallback={<Empty />}>
        <Match when={list() !== null}>
          <Main />
        </Match>
      </Switch>
    </div>
  );
};

const App: Component = () => {
  return (
    <GlobalContextProvider>
      <HomeApp />
    </GlobalContextProvider>
  );
}

export default App;
