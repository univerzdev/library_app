
import Header from './components/UI/Header';
import MyRouter from './routes/MyRouter';
import BooksProvider from './context/BooksProvider';
import LibrariesProvider from './context/LibrariesProvider';
import StudentsProvider from './context/StudentsProvider';
import FormProvider from './context/FormProvider';
const App = () => {
  return (
    <>
    <FormProvider>
      <LibrariesProvider>
      <StudentsProvider>
      <BooksProvider>
        <MyRouter>
          <Header />
        </MyRouter>
      </BooksProvider>
      </StudentsProvider>
      </LibrariesProvider>
      </FormProvider>
    </>
  );
}

export default App;
