import axios from "axios";

export default async function handler(req, res) {

    try {

        const response = await axios.get(
            "https://youtap.testrail.io/index.php?/api/v2/get_run/782",
            {
                auth: {
                    username: process.env.maychel.hutahaean@youtap.com,
                    password: process.env.NheZpqdtQPswbWrELKqQ-gATrkBjisU.KLL3uiasC
                }
            }
        );

        res.status(200).json(response.data);

    } catch (e) {

        res.status(500).json({
            error: e.message
        });

    }

}