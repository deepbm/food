import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Foods from './components/Foods';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider QueryClientProvider client={queryClient}>
      <Foods />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
