//let users = [];
//import users from './users.js'
import usersModel from "./users-model.js";

export const findAllUsers = () => usersModel.find();


export const findUserById = (uid) => usersModel.findById(uid)


export const findUserByUsername = (username) => usersModel.findOne({username})


export const findUserByCredentials = (username, password) => usersModel.findOne({username,password})


export const createUser = (user) => usersModel.create(user)


export const updateUser = (uid, user) => {
   console.log(uid);
    return  usersModel.updateOne({_id:uid},{$set:user})
}

export const deleteUser = (uid) => usersModel.deleteOne({_id:id})
