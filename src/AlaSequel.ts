const alasql = require("alasql");
import { alasquel } from '../src/services/squel/alasquel';

export class AlaSequel {
    static async load(data: any){
        return await alasquel.load(data, this);
    }
}