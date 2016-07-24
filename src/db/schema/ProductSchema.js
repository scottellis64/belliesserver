import BelliesSchema from "./BelliesSchema";

export default class ProductSchema extends BelliesSchema {
    constructor() {
        super("product", {
            id : String,
            name : String,
            shortDesc : String,
            description : String,
            price : String
        });
    }
}
