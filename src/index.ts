import { AppDataSource } from "./data-source"
import { Film } from "./entity/Film"

import express from 'express';

AppDataSource.initialize().then(async () => {
    // const films = await AppDataSource.manager.find(Film)
    console.log("Database up")
}).catch(error => console.log(error))

const app = express();
const port = 8888;

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 1);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    AppDataSource.manager.getRepository(Film).count().then(count => {
        const page =  +req.query.page-1 > 0 ? +req.query.page-1 : 0;
        const itemPerPage = +req.query.itemPerPage ? +req.query.itemPerPage : 10;
        const totalItems = count;
        const totalPages = Math.ceil(totalItems / itemPerPage);

        console.log(+req.query.itemPerPage);

        let order = {}
        order[req.query.sort ? String(req.query.sort) : "title"] = req.query.sortDir ? String(req.query.sortDir) : "ASC";

        AppDataSource.manager.getRepository(Film).find({
            take: itemPerPage,
            skip: page * itemPerPage,
            order
        }).then(films => {
            return res.send({
                data: films,
                itemPerPage,
                totalItems,
                totalPages
            });
        })
    });

});