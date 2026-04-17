import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './Components/root/Root';
import Students from './Components/students/Students';
import Edit from './Components/students/Edit';
import Create from './Components/students/Create';
import Read from './Components/students/Read';
import Courses from './Components/courses/Courses'
import ReadCourse from "./Components/courses/ReadCourse";
import EditCourse from "./Components/courses/EditCourse";
import CreateCourse from './Components/courses/CreateCourse';
import { AuthProvider } from "./Context/AuthContext";
import Login from "./pages/login/Login";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/login" element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Root />}>
        <Route index element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="edit/:id" element={<Edit />} />
        <Route path="editCourse/:id" element={<EditCourse />} />
        <Route path="read/:id" element={<Read />} />
        <Route path="readCourse/:id" element={<ReadCourse />} />
        <Route path="create" element={<Create />} />
        <Route path="createCourse" element={<CreateCourse />} />
        <Route path="*" element={<NotFound />}/>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Route>
  </>
))

const App = () => {
  return (
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
// const App = () =>{
//   return(
//     <div>
//       <BrowserRouter >
//         <Routes>
//           <Route path="/" element={ <Home />} />
//           <Route path="/create" element={<Create/>} />
//           <Route path='/edit/:id' element={<Edit/>} />
//           <Route path="/read/:id" element={<Read />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

export default App;