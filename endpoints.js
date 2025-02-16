const { app } = require('./server');


const userRoutes = require("./router/routes");
const movieRoutes = require("./router/moiveRoutes");
app.use(userRoutes)
app.use("/auth", userRoutes);
app.use('/movies',movieRoutes)

