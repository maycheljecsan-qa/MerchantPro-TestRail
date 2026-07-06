fetch("/api/run")
  .then(res => res.json())
  .then(data => {
    console.log(data);

    const passed = Number(data.passed_count ?? 0);
    const failed = Number(data.failed_count ?? 0);
    const blocked = Number(data.blocked_count ?? 0);
    const untested = Number(data.untested_count ?? 0);
    const retest = Number(data.retest_count ?? 0);

    const total = passed + failed + blocked + untested + retest;

    const passRate =
      total > 0 ? Math.round((passed / total) * 100) : 0;

    document.getElementById("passrate").innerHTML =
      `${passRate}% Passed`;

    new Chart(document.getElementById("pie"), {
      type: "pie",
      data: {
        labels: [
          "Passed",
          "Failed",
          "Blocked",
          "Untested",
          "Retest"
        ],
        datasets: [{
          data: [
            passed,
            failed,
            blocked,
            untested,
            retest
          ]
        }]
      }
    });
  })
  .catch(console.error);