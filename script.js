fetch("/api/run")

.then(res=>res.json())

.then(data=>{

const total =
data.passed_count+
data.failed_count+
data.blocked_count+
data.untested_count+
data.retest_count;

const passRate =
Math.round(data.passed_count/total*100);

document.getElementById("passrate").innerHTML=
passRate+"% Passed";

new Chart(document.getElementById("pie"),{

type:"pie",

data:{

labels:[
"Passed",
"Failed",
"Blocked",
"Untested",
"Retest"
],

datasets:[{

data:[
data.passed_count,
data.failed_count,
data.blocked_count,
data.untested_count,
data.retest_count
]

}]

}

});

});