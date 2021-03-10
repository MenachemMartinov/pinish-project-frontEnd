import { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./common/prodecectdRoute";
import cardServices from "./common/services/cardsServices";
import userService from "./common/services/userService";
import {
  Login,
  LogOut,
  SignUp,
  SignUpBusiness,
  SignUpManager,
} from "./components/auth";
import CardId from "./components/cardId";
import Category from "./components/category";
import CategoryId from "./components/categoryId";
import {
  ManagerDashboard,
  NavBar,
  UserDashboard,
  BusinessDashboard,
} from "./components/dashboard";
import EditCard from "./components/editCard";
import EditCardImg from "./components/editCardImg";
import NewCard from "./components/newCard";
import NewCategory from "./components/newCategory";
import categoryService from "./common/services/categoryService";
import MyFavorite from "./components/myFavorite";

class App extends Component {
  state = {
    user: "",
    cards: {},
    categories: [],
    allCardsPerCategory: [],
    exactCategory: "",
  };

  async componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
    const categories = await categoryService.getCategories();
    const cards = await cardServices.getMyCards();
    this.setState({ cards, categories });
  }

  render() {
    const { user, categories, cards } = this.state;
    return (
      <>
        <header className="container-fluid p-0">
          <NavBar
            user={user}
            categories={categories}
            cards={cards}
          />
          {user?.manager && <ManagerDashboard />}
          {user?.business && <BusinessDashboard />}
        </header>
        <main className="container-fluid min-vh-100 bg-dark text-white p-0 pt-4">
          <ToastContainer />

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Category {...props} allCategories={categories} />
              )}
            />
            <ProtectedRoute
              path="/new-card"
              render={(props) => <NewCard {...props} categories={categories} />}
            />
            <ProtectedRoute path="/new-category" component={NewCategory} />
            <Route
              path="/category/:id"
              render={(props) => (
                <CategoryId
                  {...props}
                  id={user?._id}
                  allCards={cards}
                  allCategories={categories}
                />
              )}
            />
            <Route
              path="/card/:id"
              exact
              render={(props) => (
                <CardId {...props} id={user?._id} cards={cards} />
              )}
            />
            <Route
              path="/card/:id/edit"
              exact
              render={(props) => (
                <EditCard {...props} categories={categories} />
              )}
            />
            <Route
              path="/card/:id/edit-img"
              exact
              render={(props) => <EditCardImg {...props} />}
            />
            <Route path="/login" component={Login} />
            <Route
              path="/myFavorite"
              render={(props) => <MyFavorite {...props} id={user?._id} />}
            />
            <Route path="/logout" component={LogOut} />
            <Route path="/sign-up-user" component={SignUp} />
            <Route path="/sign-up-business" component={SignUpBusiness} />
            <Route path="/sign-up-manager" component={SignUpManager} />
            <Redirect to="/" />
          </Switch>
        </main>
        <footer className="container-fluid bg-dark p-3"></footer>
      </>
    );
  }
}

export default App;
