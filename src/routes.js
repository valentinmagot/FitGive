// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Addbox from "@material-ui/icons/AddBox";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import ExploreIcon from '@material-ui/icons/Explore';

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Challenges from "views/Challenges/Challenges.js";
import NewChallenge from "views/Challenges/NewChallenge.js";
import Friends from "views/Friends/Friends.js";
import Explore from "views/Explore/Explore";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/app"
  },
  {
    path: "/challenges",
    name: "Challenges",
    icon: BubbleChart,
    component: Challenges,
    layout: "/app"
  },
  {
    path: "/explore",
    name: "Explore",
    icon: ExploreIcon,
    component: Explore,
    layout: "/app"
  },
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
