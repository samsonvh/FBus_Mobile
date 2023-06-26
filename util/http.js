import axios from "axios";

const BACKEND_URL = "https://fbus-swp.azurewebsites.net";

export const getCoordinations = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/api/Coordinations", {
      headers: {
        Authorization: "Bearer Generated-JWT-Token",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Lỗi khi lấy dữ liệu:", error);
    throw error;
  }
};
