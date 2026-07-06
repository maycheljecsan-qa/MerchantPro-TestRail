import axios from "axios";

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  try {
    // Check environment variables
    if (!process.env.TESTRAIL_EMAIL || !process.env.TESTRAIL_PASSWORD) {
      return res.status(500).json({
        error: "Missing TESTRAIL_EMAIL or TESTRAIL_PASSWORD environment variables.",
      });
    }

    const response = await axios.get(
      "https://youtap.testrail.io/index.php?/api/v2/get_run/782",
      {
        auth: {
          username: process.env.TESTRAIL_EMAIL,
          password: process.env.TESTRAIL_PASSWORD,
        },
        headers: {
          Accept: "application/json",
        },
        timeout: 15000,
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("TestRail API Error:");

    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);

      return res.status(error.response.status).json({
        error: error.response.data,
      });
    }

    console.error(error.message);

    return res.status(500).json({
      error: error.message,
    });
  }
}