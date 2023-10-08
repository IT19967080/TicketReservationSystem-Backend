import  Home  from "./components/Home";
import AddTrain from "./components/TrainManagement/addTrain";
import AddSchedule from "./components/TrainManagement/addSchedule";
import UpdateSchedule from "./components/TrainManagement/updateSchedule";
import ViewTrain from "./components/TrainManagement/viewTrain";
import ViewSchedule from "./components/TrainManagement/viewSchedule";
import UserRegistration from "./components/UserManagement/Register";
import ViewUsers from "./components/UserManagement/ViewUsers";
import UserLogin from "./components/UserManagement/Login";

const AppRoutes = [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/viewschedule',
    element: <ViewSchedule />
  },
  {
    path: '/addschedule',
    element: <AddSchedule />
  },
  {
    path: '/editschedule/:id',
    element: <UpdateSchedule/>
  },
  {
    path: '/addtrain',
    element: <AddTrain/>
  },
  {
    path: '/viewtrain',
    element: <ViewTrain/>
  },
  {
    path: '/register',
    element: <UserRegistration/>
  },
  {
    path: '/view_users',
    element: <ViewUsers/>
  },
  {
    path: '/login',
    element: <UserLogin/>
  }
];

export default AppRoutes;
