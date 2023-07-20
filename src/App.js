import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Foods from './components/Foods';
import FoodForm from './components/FoodForm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider QueryClientProvider client={queryClient}>
      <FoodForm />
      <Foods />
    </QueryClientProvider>
  );
}

export default App;
