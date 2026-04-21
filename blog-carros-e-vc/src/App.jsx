//CSS
import "./App.css";

//React Router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

//Toast Notifications
import { ToastContainer } from "react-toastify";

//Funções do Firebase
import { onAuthStateChanged } from "firebase/auth";

//Hooks do React
import { useEffect, useState } from "react";

//Custom Hooks
import { useAuthentication } from "./hooks/useAuthentication";

//Context
import { AuthProvider } from "./context/AuthContext";

//Pages
import Footer from "./components/Footer";
import LoadingState from "./components/LoadingState";
import Navbar from "./components/Navbar";
import About from "./pages/about/About";
import CreatePost from "./pages/createPost/CreatePost";
import Dashboard from "./pages/dashboard/Dashboard";
import EditPost from "./pages/editPost/EditPost";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import Post from "./pages/post/Post";
import Register from "./pages/register/Register";
import Search from "./pages/search/Search";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <LoadingState />;
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
        <AuthProvider value={{ user }}>
          <BrowserRouter>
            <Navbar />

            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
                <Route path="/posts/:id" element={<Post />} />
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/register"
                  element={!user ? <Register /> : <Navigate to="/" />}
                />
                <Route
                  path="/posts/edit/:id"
                  element={user ? <EditPost /> : <Navigate to="/login" />}
                />
                <Route
                  path="/posts/create"
                  element={user ? <CreatePost /> : <Navigate to="/login" />}
                />
                <Route
                  path="/dashboard"
                  element={user ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>

            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
