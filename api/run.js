import axios from "axios";

export default async function handler(req, res) {
  try {
    // Check environment variables
    if (!process.env.TESTRAIL_EMAIL || !process.env.TESTRAIL_API_KEY) {
      return res.status(500).json({
        error:
          "Missing TESTRAIL_EMAIL or TESTRAIL_API_KEY environment variables.",
      });
    }

    const response = await axios.get(
      "https://youtap.testrail.io/index.php?/api/v2/get_run/782",
      {
        auth: {
          username: process.env.TESTRAIL_EMAIL,
          password: process.env.TESTRAIL_API_KEY,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("TestRail API Error:", error.response?.data || error.message);

    return res.status(error.response?.status || 500).json({
      message: "Failed to fetch TestRail data",
      error: error.response?.data || error.message,
    });
  }
}