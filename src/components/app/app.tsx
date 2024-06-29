import '../../index.css';
import styles from './app.module.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchBurgerIngredients } from '../../services/slices/burgerIngredientsSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppHeader />,
    children: [
      {
        index: true,
        element: <ConstructorPage />
      },
      {
        path: 'feed',
        element: <Feed />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      },
      {
        path: 'reset-password',
        element: <ResetPassword />
      },
      {
        path: 'profile/',
        element: <Profile />,
        children: [
          {
            path: 'orders',
            element: <ProfileOrders />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound404 />
      }
    ]
  },
  {
    path: '/ingredients/:id',
    element: (
      <Modal title='Детали ингредиента' onClose={() => {}}>
        <IngredientDetails />
      </Modal>
    )
  }
]);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBurgerIngredients());
  }, []);
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
