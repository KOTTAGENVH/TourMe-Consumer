import { apiClient } from "../axios/api";

//Get all hotels
export const getallhotels = async () => {
  try {
    const response = await apiClient.get("/hotel/get-all-hotels");
    return response.data;
  } catch (error) {
    return error;
  }
};

//Get hotel by id
export const getHotelById = async (id) => {
  try {
    const response = await apiClient.get(`/hotel/get-single-hotel/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

//Update Rating
export const updatehotelRating = async (id, rating) => {
  try {
    const response = await apiClient.patch(`/hotel/update-hotel-rating/${id}`, {
      rating,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

//Create hotel order
export const createHotelOrder = async (
  userid,
  selleremail,
  hotelid,
  useremail,
  TotalRooms,
  total,
  datebook,
  date
) => {
  try {
    const status = "Booked";
    const response = await apiClient.post(`/hotel-order/order-hotel-room`, {
      userid,
      selleremail,
      hotelid,
      useremail,
      status,
      TotalRooms,
      total,
      datebook,
      date,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

//Get hotel orders by seller email
export const getHotelOrdersByUserid = async (userid) => {
  try {
    const response = await apiClient.get(
      `/hotel-order/get-hotel-order-by-userid/${userid}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
