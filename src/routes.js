// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Addbox from "@material-ui/icons/AddBox";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Challenges from "views/Challenges/Challenges.js";
import NewChallenge from "views/Challenges/NewChallenge.js";
import Friends from "views/Friends/Friends.js";
import UserProfile from "views/UserProfile/UserProfile.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/app"
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/app"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/app"
  // },
  {
    path: "/challenges",
    name: "Challenges",
    icon: BubbleChart,
    component: Challenges,
    layout: "/app"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/app"
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/app"
  // },
  {
    path: "/friends",
    name: "Friends",
    icon: SupervisorAccount,
    component: Friends,
    layout: "/app"
  },
  {
    path: "/new-challenge",
    name: "New Challenge",
    icon: Addbox,
    component: NewChallenge,
    layout: "/app"
  },
];

export { dashboardRoutes };
