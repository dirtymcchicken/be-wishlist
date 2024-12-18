import {WhishlistDB} from "./DB/init.db";

const wdb = new WhishlistDB()
// wdb.createUser('max', '123456')
wdb.getUsers()