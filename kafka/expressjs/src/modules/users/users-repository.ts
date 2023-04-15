import { DbDataOpsInstance } from "../../libs/mongodb";
import { Repository } from "../../libs/mongodb/repository";

class UsersRepository implements Repository {
    private collectionName = "users";

    async create(doc: any): Promise<any> {
        try {
            const result = DbDataOpsInstance.insertOne<any>(
                this.collectionName,
                doc
            );
            return result;
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    readMany(
        limit: number,
        page: number
    ): any {
        try {
            return DbDataOpsInstance.find<any>(
                this.collectionName,
                null,
                {
                    limit: limit,
                    skip: page * limit - limit
                }
            );
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    async readOne(id: string): Promise<any> {
        try {
            return await DbDataOpsInstance.findOne<any>(
                this.collectionName,
                {
                    id: id
                }
            );
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    async update(id: string, update: any): Promise<any> {
        try {
            const result = DbDataOpsInstance.updateOne<any>(
                this.collectionName,
                {
                    _id: id
                },
                update
            );
            return result;
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const result = DbDataOpsInstance.deleteOne<any>(
                this.collectionName,
                {
                    _id: id
                },
                null
            );
            return result;
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }
}

export default new UsersRepository;