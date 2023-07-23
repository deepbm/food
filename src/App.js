import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styles from './App.module.css';
import Foods from './components/Foods';
import { LocaleProvider } from './contexts/LocaleContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FoodForm from './components/FoodForm';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Header />
      <LocaleProvider initialValue='ko'>
        <QueryClientProvider QueryClientProvider client={queryClient}>
          <section className={styles.container}>
            <div className={styles.FoodForm__container}>
              <FoodForm />
            </div>
            <Foods />
          </section>
        </QueryClientProvider>
        <Footer />
      </LocaleProvider>
    </>
  );
}

export default App;
