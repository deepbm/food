import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Foods from './components/Foods';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider QueryClientProvider client={queryClient}>
      <Foods />
    </QueryClientProvider>
  );
}

export default App;
