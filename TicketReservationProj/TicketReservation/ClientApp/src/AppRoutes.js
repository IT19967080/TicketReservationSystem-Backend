import Home from "./components/Home";
import AddTrain from "./components/TrainManagement/addTrain";
import AddSchedule from "./components/TrainManagement/addSchedule";
import UpdateSchedule from "./components/TrainManagement/updateSchedule";
import ViewTrain from "./components/TrainManagement/viewTrain";
import ViewSchedule from "./components/TrainManagement/viewSchedule";

import UserRegistration from "./components/UserManagement/Register";
import ViewUsers from "./components/UserManagement/ViewUsers";
import UserLogin from "./components/UserManagement/Login";

import AddTicket from "./components/TicketManagement/addReservation";
import ViewReservation from "./components/TicketManagement/viewReservation";
import UpdateReservation from "./components/TicketManagement/updateReservation";
import CreateTravelerProfile from "./components/TravelerManagement/CreateTravelerProfile";
import EditTravelerProfile from "./components/TravelerManagement/EditTravelerProfile";

const AppRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/viewschedule",
    element: <ViewSchedule />,
  },
  {
    path: "/addschedule",
    element: <AddSchedule />,
  },
  {
    path: "/editschedule/:id",
    element: <UpdateSchedule />,
  },
  {
    path: "/addtrain",
    element: <AddTrain />,
  },
  {
    path: "/viewtrain",
    element: <ViewTrain />,
  },
  {
    path: "/register",
    element: <UserRegistration />,
  },
  {
    path: "/view_users",
    element: <ViewUsers />,
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/addticket",
    element: <AddTicket />,
  },
  {
    path: "/viewticket",
    element: <ViewReservation />,
  },
  {
    path: "/editreservation/:id",
    element: <UpdateReservation />,
  },
  {
    path: "/create-traveler-profile",
    element: <CreateTravelerProfile />,
  },
  {
    path: "/edit-traveler-profile",
    element: <EditTravelerProfile />,
  },
];

export default AppRoutes;
