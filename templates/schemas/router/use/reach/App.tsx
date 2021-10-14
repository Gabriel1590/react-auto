import { GlobalStyles } from '../styles/GlobalStyles';
import { AppRouter } from './Router';

function App(): JSX.Element {
  return (
    <>
      <GlobalStyles />

      <div>
        <h1>
          Hello React
        </h1>
      </div>

      <AppRouter />
    </>
  );
}

export default App;
