import  Home  from "./components/Home";
import AddTrain from "./components/TrainManagement/addTrain";
import AddSchedule from "./components/TrainManagement/addSchedule";
import UpdateSchedule from "./components/TrainManagement/updateSchedule";
import ViewTrain from "./components/TrainManagement/viewTrain";
import ViewSchedule from "./components/TrainManagement/viewSchedule";

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
  }
];

export default AppRoutes;
