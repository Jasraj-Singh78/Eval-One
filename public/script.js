async function addHabit(){
    const habit = document.getElementById("habitInput").value;

    await fetch("/addHabit",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({habit})
    });

    alert("Habit added");
}

async function loadHabits(){
    const res = await fetch("/getHabits");
    const data = await res.text();

    document.getElementById("output").innerText = data;
}

async function deleteHabits(){
    await fetch("/deleteHabits",{method:"DELETE"});
    alert("All habits deleted");
}

async function streamHabits(){
    const res = await fetch("/streamHabits");
    const data = await res.text();

    document.getElementById("output").innerText = data;
}