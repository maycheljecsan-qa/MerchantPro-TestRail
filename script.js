fetch("/api/run")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  });