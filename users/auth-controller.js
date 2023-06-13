import * as usersDao from "./users-dao.js";

let currentUserGlobal = null;
const AuthController = (app) => {
    const register = async (req, res) => {
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(403);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        //req.session["currentUser"] = newUser;
        currentUserGlobal = newUser;
        res.json(newUser);

    };


    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
                //req.session["currentUser"] = user;
                currentUserGlobal = user;
                res.json(user);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    };


    const profile = (req, res) => {
        //const currentUser = req.session["currentUser"];
        const currentUser = currentUserGlobal
        if (!currentUser) {
            res.sendStatus(500);
            return;
        }
        res.json(currentUser);
    };

    const logout = async (req, res) => {
        //req.session.destroy();
        currentUserGlobal=null;
        res.sendStatus(200);
    };


    /*const updateUser = async (req, res) => {
        const id = req.params.id;
        const status = await usersDao.updateUser(id, req.body);
        const user = await usersDao.findUserById(id);
        req.session["currentUser"] = user;
        res.json(status);
    };*/


    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    //app.put("/api/users/:uid", updateUser);
};
export default AuthController;