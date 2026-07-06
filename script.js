fetch("/api/run")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch TestRail data");
    }
    return res.json();
  })
  .then((data) => {
    console.log("TestRail Response:", data);

    const passed = Number(data.passed_count ?? 0);
    const failed = Number(data.failed_count ?? 0);
    const blocked = Number(data.blocked_count ?? 0);
    const untested = Number(data.untested_count ?? 0);
    const retest = Number(data.retest_count ?? 0);

    const total = passed + failed + blocked + untested + retest;

    const passRate =
      total > 0 ? Math.round((passed / total) * 100) : 0;

    // Update Summary
    document.getElementById("passed").textContent = passed;
    document.getElementById("failed").textContent = failed;
    document.getElementById("blocked").textContent = blocked;
    document.getElementById("untested").textContent = untested;
    document.getElementById("retest").textContent = retest;

    // Update Pass Rate
    document.getElementById("passrate").textContent = `${passRate}%`;
    document.getElementById(
      "untestedText"
    ).textContent = `${untested} / ${total} untested`;

    // Destroy existing chart if any
    if (window.testRailChart) {
      window.testRailChart.destroy();
    }

    window.testRailChart = new Chart(document.getElementById("pie"), {
      type: "pie",
      data: {
        labels: [
          "Passed",
          "Failed",
          "Blocked",
          "Untested",
          "Retest",
        ],
        datasets: [
          {
            data: [
              passed,
              failed,
              blocked,
              untested,
              retest,
            ],
            backgroundColor: [
              "#39b54a", // Passed
              "#e91e63", // Failed
              "#555555", // Blocked
              "#9e9e9e", // Untested
              "#ffb300", // Retest
            ],
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}`;
              },
            },
          },
        },
      },
    });
  })
  .catch((err) => {
    console.error(err);

    document.getElementById("passrate").textContent = "Error";
    document.getElementById("untestedText").textContent =
      "Unable to load TestRail data.";
  });