import { Home } from "./components/Home";
import CreateTravelerProfile from "./components/TravelerManagement/CreateTravelerProfile";
import EditTravelerProfile from "./components/TravelerManagement/EditTravelerProfile";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
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
