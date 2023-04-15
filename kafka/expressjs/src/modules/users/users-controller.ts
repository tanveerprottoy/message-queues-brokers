import express from "express";
import usersService from "./users-service";

class UsersController {

    create = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        return await usersService.create(req.body, res);
    };

    readMany = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        const limit = 100;
        const page = 1;
        return await usersService.readMany(limit, page, res);
    };

    search = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        return await usersService.search(req.query.text.toString(), res);
    };
}

export default new UsersController;