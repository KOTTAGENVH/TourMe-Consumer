import { apiClient } from "../axios/api";

// Get all souveniers
export const getAllsouveniers = async () => {
  try {
    const response = await apiClient.get("/souvenier/get-all-souveniers");
    return response.data;
  } catch (error) {
    return error;
  }
};

// Get souvenier by id
export const getSouvenierbyId = async (id) => {
  try {
    const response = await apiClient.get(
      `/souvenier/get-single-souvenier/${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

//Update souvenier rating
export const updateSouvenierRating = async (id, rating) => {
  try {
    const response = await apiClient.patch(`/souvenier/update-rating/${id}`, {
      rating,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

//create souvenier order
export const createSouvenierOrder = async (
  userid,
  selleremail,
  souvenierid,
  useremail,
  productname,
  total,
  date
) => {
  try {
    const response = await apiClient.post(
      `/souvenier-order/create-souvenier-order`,
      {
        userid,
        selleremail,
        souvenierid,
        useremail,
        productname,
        state: "pending",
        total,
        date,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

//get all souvenier orders by useremail
export const getSouvenierOrdersByUseremail = async (useremail) => {
  try {
    const response = await apiClient.get(
      `/souvenier-order/get-souvenier-order-by-useremail/${useremail}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};


//Update souvenier order
export const updateSouvenierOrder = async (id,status) => {
  try {
    const response = await apiClient.patch(
      `/souvenier-order/update-souvenier-order/${id}`,
      {
        state: status,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};