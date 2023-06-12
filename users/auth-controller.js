import * as usersDao from "./users-dao.js";

let currentUserGlobal = null;
const AuthController = (app) => {
    const register = (req, res) => {
        const username = req.body.username;
        const user = usersDao.findUserByUsername(username);
        if (user) {
            res.sendStatus(409);
            return;
        }
        const newUser = usersDao.createUser(req.body);
        //req.session["currentUser"] = newUser;
        currentUserGlobal = newUser;
        res.json(newUser);
    };

    const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = usersDao.findUserByCredentials(username, password);
        if (user) {
            //req.session["currentUser"] = user;
            currentUserGlobal = user;
            res.json(user);
        } else {
            res.sendStatus(404);
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

    const updateUser = (req, res) => {
        const userId = req.params['uid']
        const updates = req.body
        usersDao.updateUser(userId, updates);
        res.sendStatus(200)
    }


    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users/:uid", updateUser);
};
export default AuthController;