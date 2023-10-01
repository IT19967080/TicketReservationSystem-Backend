import  Home  from "./components/Home";
import AddSchedule from "./components/TrainManagement/addSchedule";
import UpdateSchedule from "./components/TrainManagement/updateSchedule";

const AppRoutes = [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/addschedule',
    element: <AddSchedule />
  },
  {
    path: '/editschedule/:id',
    element: <UpdateSchedule/>
  }
];

export default AppRoutes;
