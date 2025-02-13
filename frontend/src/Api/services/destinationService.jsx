import { apiClient } from "../axios/api";

//Get all destinations
export const getAlldestinations = async () => {
  try {
    const response = await apiClient.get("/destination/get-all-destinations");
    return response.data;
  } catch (error) {
    return error;
  }
};

//Get destination by id
export const getDestinationById = async (id) => {
  try {
    const response = await apiClient.get(
      `/destination/get-destination-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

//Update Rating
export const updatedestinationRating = async (id, rating) => {
  try {
    const response = await apiClient.patch(`/destination/update-rating/${id}`, {
      rating,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

//Create destination order
export const createDestinationOrder = async (
  userid,
  selleremail,
  destinationid,
  useremail,
  productname,
  Totaltickets,
  total,
  datebook,
  date
) => {
  try {
    const status = "Booked";
    const response = await apiClient.post(
      `/destination-order/create-destination-order`,
      {
        userid,
        selleremail,
        destinationid,
        useremail,
        productname,
        status,
        Totaltickets,
        total,
        datebook,
        date,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

//Get all destination orders by user email
export const getDestinationOrdersByUseremail = async (useremail) => {
  try {
    const response = await apiClient.get(
      `/destination-order/get-destination-order-by-user-email/${useremail}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
