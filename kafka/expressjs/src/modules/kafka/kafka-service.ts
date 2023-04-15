import { EsOpsInstance } from "../../libs/elasticsearch";

class KafkaService {

    create = async (
        data: any
    ): Promise<any> => {
        console.log("elastic.create: ", data);
        const result = await EsOpsInstance.create(
            "user",
            data
        );
        console.log(result);
        return result;
    };

    search = async (
        text: string
    ): Promise<any> => {
        const result = await EsOpsInstance.search(
            "user",
            {
                match: { name: text }
            }
        );
        console.log(result);
        return result;
    };
}

export default new ElasticSearchService;