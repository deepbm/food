import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Foods from './components/Foods';
import { LocaleProvider } from './contexts/LocaleContext';
import LocaleSelect from './components/LocaleSelect';

const queryClient = new QueryClient();

function App() {
  return (
    <LocaleProvider initialValue='ko'>
      <QueryClientProvider QueryClientProvider client={queryClient}>
        <LocaleSelect />
        <Foods />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </LocaleProvider>
  );
}

export default App;
