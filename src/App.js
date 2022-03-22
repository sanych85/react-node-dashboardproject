import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Register, Landing, Error, ProtectedRoute } from './pages';
import {
  AllJobs,
  AddJob,
  Profile,
  SharedLayout,
  Stats,
} from './pages/Dashboard';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout/>
              </ProtectedRoute>
            }
            >
            <Route index  element={<Stats />}></Route>
            <Route path="all-jobs" element={<AllJobs />}></Route>
           
            <Route path="profile" element={<Profile />}></Route>
            <Route path="add-job" element={<AddJob />}></Route>
           
          </Route>
          <Route path="/some" element={<div>Some</div>  }></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="*" element={<Error></Error>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
