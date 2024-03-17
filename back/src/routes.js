/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import ProductList from "views/ProductList.js";
import CreateProduct from "views/CreateProduct.js";
import EditProduct from "views/EditProduct.js";
import CreateGallery from "views/CreateGallery";

import EventList from "views/EventList";
import CreateEvent from "views/CreateEvent";
import EditEvent from "views/EditEvent";
import GalleryList from "views/GalleryList";
import EditGallery from "views/EditGallery";

import UsersList from "views/UsersList";
import CreateFidelite from "views/CreateFidelite";
import ListFidelite from "views/ListFidelite";
import ArticleList from "views/ArticleList";
import EditArticle from "views/EditArticle";
import CreateArticle from "views/CreateArticle";
import EditFidelite from "views/EditFidelite";




import CreateReclamation from "views/CreateReclamation";
import ReclamationList from "views/ReclamationList";
import EditReclamation from "views/EditReclamation";
var routes = [
  //Users

  //Products
  {
    path: "/list_products",
    name: "Product List",
    icon: "nc-icon nc-shop",
    component: <ProductList />,
    layout: "/admin",
  },
  {
    path: "/product/create",
    name: "Create Product",
    icon: "nc-icon nc-simple-add",
    component: <CreateProduct />,
    layout: "/admin",
  },
  {
    path: "/products/edit/:id",
    name: "Edit Product",
    icon: "nc-icon nc-ruler-pencil",
    component: <EditProduct />,
    layout: "/admin",
  },
  //Events
  {
    path: "/list_events",
    name: "Event List",
    icon: "nc-icone nc-pin-3",
    component: <EventList />,
    layout: "/admin",
  },
  {
    path: "/event/create",
    name: "Create Event",
    icon: "nc-icon nc-simple-add",
    component: <CreateEvent />,
    layout: "/admin",
  },
  {
    path: "/event/:id",
    name: "Edit Event",
    icon: "nc-icon nc-ruler-pencil",
    component: <EditEvent />,
    layout: "/admin",
  },
  //Galleries
  {
    path: "/list_galleries",
    name: "Gallery List",
    icon: "nc-icon nc-shop",
    component: <GalleryList />,
    layout: "/admin",
  },
  {
    path: "/gallery/create",
    name: "Create Gallery",
    icon: "nc-icon nc-simple-add",
    component: <CreateGallery />,
    layout: "/admin",
  },
  {
    path: "/gallery/edit/:id",
    component: <EditGallery />,
    layout: "/admin",
  },

  {
    path: "/fidelite/create",
    name: "Fidelite Create",
    icon: "nc-icon nc-shop",
    component: <CreateFidelite />,
    layout: "/admin",
  },
  {
    path: "/fidelite/list",
    name: "Fidelite List",
    icon: "nc-icon nc-shop",
    component: <ListFidelite />,
    layout: "/admin",
  },
  //Reclamations
  {
    path: "/list_reclamations",
    name: "Reclamation List",
    icon: "nc-icon nc-bell-55" ,
    component: <ReclamationList />,
    layout: "/admin",
  },
  {
    path: "/reclamation/create",
    name: "Create Reclamation",
    icon: "nc-icon nc-simple-add",
    component: <CreateReclamation/>,
    layout: "/admin",
  },
  {
    path: "/reclamation/edit/:id",
    component: <EditReclamation />,
  },
  //Article
  {
    path: "/article",
    name: "Article List",
    icon: "fas fa-book",
    component: <ArticleList />,
    layout: "/admin",
  },
  {
    path: "/article/create",
    name: "Create Article",
    icon: "fas fa-pencil-alt",
    component: <CreateArticle/>,
    layout: "/admin",
  },
  {
    path: "/article/edit/:id",
    component: <EditArticle />,
    layout: "/admin",
  },
  {
    path: "/fidelite/edit/:id",
    name: "Fidelite update",
    icon: "nc-icon nc-shop",
    component: <EditFidelite />,
    layout: "/admin",
  },
];
export default routes;
