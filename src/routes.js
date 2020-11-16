// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import BubbleChart from "@material-ui/icons/BubbleChart";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Challenges from "views/Challenges/Challenges.js";
import Friends from "views/Friends/Friends.js";


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
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/app"
  // },
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
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/app"
  // }
];

export { dashboardRoutes };
