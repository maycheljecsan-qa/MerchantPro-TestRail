import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://youtap.testrail.io/index.php?/api/v2/get_run/782",
      {
        auth: {
          username: process.env.TESTRAIL_EMAIL,
          password: process.env.TESTRAIL_PASSWORD,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message,
    });
  }
}