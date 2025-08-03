
import Home from './components/home/Home';
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import LoginPopup from './components/Login/Login';
import Create from './components/create/Create';
import Profile from './components/profile/Profile';
import AppOutlet from './components/AppOutlet';
import ProfileEdit from './components/profile/ProfileEdit';
// import CommentData from './components/comment/CommentData';





const App = () => {

  const router = createBrowserRouter([

    {
      path: "/",
      element: <LoginPopup />,
    },
    {
      path: "/",
      element: <AppOutlet />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/profile/:id/profile-edit",
          element: <ProfileEdit/>,
        },
      ]
    },


  ])

  // <Routes>
  // <Route path="/profile/:id" element={<Profile />} />
  //   <Route path="/" element={<LoginPopup />} /> n
  //   <Route path="/home" element={<Home />} />
  //   <Route path="/create" element={<Create />} />
  //   <Route path="/profile" element={<Profile />} />
  // </Routes>

  return <RouterProvider router={router} />

}

export default App;
