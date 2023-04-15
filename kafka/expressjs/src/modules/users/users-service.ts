import express from "express";
import usersRepository from "./users-repository";
import elasticsearchService from "../kafka/kafka-service";
import { ResponseUtils } from "../../utils/response-utils";
import { HttpCodes } from "../../utils/constants";
import DbUtils from "../../libs/mongodb/db-utils";

class UsersService {

    create = async (
        data: any,
        res: express.Response,
    ): Promise<any> => {
        const result = await usersRepository.create(data);
        // filter out unwanted field, as mongodb client mutates the
        // passed object
        const {
            _id,
            ...filtered
        } = data;
        console.log("filtered: ", filtered)
        const result1 = await elasticsearchService.create(filtered);
        return ResponseUtils.respond(
            HttpCodes.HTTP_201,
            ResponseUtils.buildData(result.insertedId.toString()),
            res
        );
    };

    readMany = async (
        limit: number,
        page: number,
        res: express.Response,
    ): Promise<any> => {
        const cursor = usersRepository.readMany(limit, page);
        let docs = await DbUtils.streamCursorData(cursor);
        if(!docs) {
            docs = [];
        }
        return ResponseUtils.respond(
            HttpCodes.HTTP_200,
            ResponseUtils.buildData(docs),
            res,
        );
    };

    search = async (
        text: string,
        res: express.Response,
    ): Promise<any> => {
        return ResponseUtils.respond(
            HttpCodes.HTTP_200,
            ResponseUtils.buildData(await elasticsearchService.search(text)),
            res
        );
    };
}

export default new UsersService;