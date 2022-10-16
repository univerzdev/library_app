import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Libraries from '../pages/Libraries';
import LibraryDetail from '../pages/LibraryDetail';
import StudentDetail from '../pages/StudentDetail';

const MyRouter = (props) => {
  return (
    <BrowserRouter>
      {props.children}

      <Routes>
        <Route path='/' element={<Libraries />} exact />
        <Route path='/libraries/:id' element={<LibraryDetail />} exact />
        <Route path='/students/:id' element={<StudentDetail />} exact />
      </Routes>
    </BrowserRouter>
  );
}
export default MyRouter;
