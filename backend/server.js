import connectDB from "./src/config/db.js";
import app from "./src/index.js";
connectDB();

app.listen(3000, () => {
            console.log("Server is listening at port 3000")
})