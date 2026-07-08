fetch("/api/run")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("TestRail Response:", data);

    // ===========================
    // Get Data
    // ===========================

    const passed = Number(data.passed_count ?? 0);
    const failed = Number(data.failed_count ?? 0);
    const blocked = Number(data.blocked_count ?? 0);
    const untested = Number(data.untested_count ?? 0);
    const retest = Number(data.retest_count ?? 0);
    const skipped = Number(data.custom_status2_count ?? 0);

    const total =
      passed +
      failed +
      blocked +
      untested +
      retest +
      skipped;

    const passRate =
      total > 0
        ? Math.round((passed / total) * 100)
        : 0;

        const untestedRate =
          total > 0
            ? ((untested / total) * 100).toFixed(0)
            : 0;

    // ===========================
    // Update Summary
    // ===========================

    document.getElementById("passed").textContent = passed;
    document.getElementById("failed").textContent = failed;
    document.getElementById("blocked").textContent = blocked;
    document.getElementById("untested").textContent = untested;
    document.getElementById("retest").textContent = retest;
    document.getElementById("skipped").textContent = skipped;

    // ===========================
    // Update Right Card
    // ===========================

    document.getElementById("passrate").textContent =
      `${passRate}%`;


    document.getElementById("untestedText").textContent =
    `${untested} / ${total} untested (${untestedRate}%).`;

    // ===========================
    // Destroy Existing Chart
    // ===========================

    if (window.testRailChart) {
      window.testRailChart.destroy();
    }

    // ===========================
    // Create Pie Chart
    // ===========================

    const ctx = document
      .getElementById("pie")
      .getContext("2d");

    window.testRailChart = new Chart(ctx, {
      type: "pie",

      data: {
        labels: [
          "Passed",
          "Failed",
          "Blocked",
          "Untested",
          "Retest"
        ],

        datasets: [
          {
            data: [
              passed,
              failed,
              blocked,
              untested,
              retest
            ],

            backgroundColor: [
              "#3cb44b", // Passed
              "#d7004d", // Failed
              "#555555", // Blocked
              "#9e9e9e", // Untested
              "#ffb400", // Retest
              "#5b2be0"  // Skipped
            ],

            borderColor: "#ffffff",
            borderWidth: 2,
            hoverOffset: 8
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false
          },

          tooltip: {
            callbacks: {
              label: function (context) {
                const percent = (
                  (context.raw / total) *
                  100
                ).toFixed(1);

                return `${context.label}: ${context.raw} (${percent}%)`;
              }
            }
          }
        }
      }
    });
  })
  .catch((error) => {
    console.error(error);

    document.getElementById("passrate").textContent = "Error";
    document.getElementById("untestedText").textContent =
      "Unable to load TestRail data";
  });