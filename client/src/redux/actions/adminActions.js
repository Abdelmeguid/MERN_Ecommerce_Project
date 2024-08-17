import axios from "axios";
import {
  getUsers,
  userDelete,
  resetError,
  setError,
  setLoading,
  orderDelete,
  setDeliveredFlag,
  getOrders,
} from "../slices/admin";
import {
  setProducts,
  setProductUpdateFlag,
  setReviewRemovalFlag,
} from "../slices/products";

//Discuss getAllUsers
//1-getAllUsers is dispatched this mean it triggered by action by huaman in the browser app or from useeffect as in this case from UsersTab.jsx
//2-and getstate function according this dispatch from user is triggered and run
//3- in this part (user: { userInfo },)...... user (is the slice called user ) from it we get { userInfo }
//note that slices is the container of our date from it we find data and send it with requstes to server & from it too
//we update our app in the browser with information and data
//4- we send http to server by URL 'api/users'
//5- server recieve in index.js and send it to specific router called user router
//6- by middelware called authintication the route import it and use it ,the router know that it is admin ,note that the user router
//have two GET http one of them need admin user this is that we work in it in  below getAllUsers
//7- if the http requst from getAllUsers  failed update the slice called admin specified  in  (setError ) in admin slice note: it imported in the start of
//this file ,and if http requst sucess we update the slice called admin specified in  (getUsers ) in admin slice .
//note: it imported in the start of this file
//noted that when we say for exmaple dispatch(getUsers(data)); or dispatch(setError ...this mean we fill this fields in slice admin with data

////To summarize : the Human (admin or ordinaryuser ) dispatch afunction in actions file this leads to http requst go to server with data from stores called slices
// and when res come from server we extract the result data from it and update data in stores called slices and use it to show
//the result on the app in the browser

//noted that the admin action contained all needed actions by the Admin
//getAllUsers is dispatched this mean it triggered by action by huaman in the browser app or from useeffect as in this case from UsersTab.jsx

/////etnew discuss for gAllUsers ..the getAllUsers is trigger from UsersTab.jsx ...then find data from slice called user ..then use this info to send to backend 
///th server if reply with data we will dispatch another slice with the comming data from the backend and if error we dipatch and update another slices with the errors.
export const getAllUsers = () => async (dispatch, getState) => {
  const {
    //user below is slice called user from it find the data
    //we find all needed data from the slices
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("api/users", config);
    dispatch(getUsers(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Users could not be fetched."
      )
    );
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(`api/users/${id}`, config);
    dispatch(userDelete(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Users could not be fetched."
      )
    );
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("api/orders", config);
    dispatch(getOrders(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Orders could not be fetched."
      )
    );
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(`api/orders/${id}`, config);
    dispatch(orderDelete(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Order could not be removed."
      )
    );
  }
};

export const setDelivered = (id) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    await axios.put(`api/orders/${id}`, {}, config);
    dispatch(setDeliveredFlag());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Order could not be updated."
      )
    );
  }
};

export const resetErrorAndRemoval = () => async (dispatch) => {
  dispatch(resetError());
};

//update Product
export const updateProduct =
  (brand, name, category, stock, price, id, productIsNew, description, image) =>
  async (dispatch, getState) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `api/products`,
        {
          brand,
          name,
          category,
          stock,
          price,
          id,
          productIsNew,
          description,
          image,
        },
        config
      );
      dispatch(setProducts(data));
      dispatch(setProductUpdateFlag());
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "Product could not be updated."
        )
      );
    }
  };

//delete Product
export const deleteProduct = (id) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(`api/products/${id}`, config);
    dispatch(setProducts(data));
    dispatch(setProductUpdateFlag());
    dispatch(resetError());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Product could not be removed."
      )
    );
  }
};

//upload Product
export const uploadProduct = (newProduct) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`api/products`, newProduct, config);
    dispatch(setProducts(data));
    dispatch(setProductUpdateFlag());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Product could not be uploaded."
      )
    );
  }
};

export const removeReview =
  (productId, reviewId) => async (dispatch, getState) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `api/products/${productId}/${reviewId}`,
        {},
        config
      );
      dispatch(setProducts(data));
      dispatch(setReviewRemovalFlag());
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "Review could not be removed."
        )
      );
    }
  };
