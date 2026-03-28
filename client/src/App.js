import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './elements/root/Root';
import Students from './elements/students/Students';
import Edit from './elements/students/Edit';
import Create from './elements/students/Create';
import Read from './elements/students/Read';
import Courses from './elements/courses/Courses'
import ReadCourse from "./elements/courses/ReadCourse";
import EditCourse from "./elements/courses/EditCourse";
import CreateCourse from './elements/courses/CreateCourse';



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route index element={<Students />}/>
    <Route path="/courses" element={<Courses />} />
    <Route path="edit/:id" element={<Edit />}/>
    <Route path="editCourse/:id" element={<EditCourse />}/>
    <Route path="read/:id" element={<Read />}/>
    <Route path="readCourse/:id" element={<ReadCourse />}/>
    <Route path="create" element={<Create />}/>
    <Route path="createCourse" element={<CreateCourse />}/>

  </Route>
))

const App = () =>{
  return(
    <div>
      <RouterProvider router={router} />
    </div>
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