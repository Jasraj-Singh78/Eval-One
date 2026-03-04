const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static("public"));

/* HOME ROUTE */
app.get("/", (req, res) => {
    res.send("AI Habit Tracker Server Running");
});

/* ADD HABIT */
app.post("/addHabit", (req, res) => {
    const habit = req.body.habit + "\n";

    fs.appendFile("habits.txt", habit, (err) => {
        if (err) {
            return res.status(500).send("Error saving habit");
        }
        res.send("Habit added successfully");
    });
});

/* READ HABITS */
app.get("/getHabits", (req, res) => {
    fs.readFile("habits.txt", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading habits");
        }
        res.send(data);
    });
});

/* DELETE ALL HABITS */
app.delete("/deleteHabits", (req, res) => {
    fs.writeFile("habits.txt", "", (err) => {
        if (err) {
            return res.status(500).send("Error deleting habits");
        }
        res.send("All habits deleted");
    });
});

/* STREAM HABITS */
app.get("/streamHabits", (req, res) => {
    const stream = fs.createReadStream("habits.txt", "utf8");
    stream.pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});