import { callbackify } from "util";
import { AlaSequel } from "../../AlaSequel";
import { ILoadOption } from "../../interface/IOption";

const squel = require('squel');
const alasql = require("alasql");
const alasquel = squel.select(); 
const axios = require('axios').default;

Object.defineProperty(alasquel, "has", {
    value: function has(){
        return this.toString();
    }
});

Object.defineProperty(alasquel, "row", {
    value: function row(index: number = 0){
        const query = this.toString();
        const data = alasql(query, [this._dataset]);
        return data[index];
    }
});

Object.defineProperty(alasquel, "get", {
    value: function get(){
        const query = this.toString();
        return alasql(query, [this._dataset]);
    }
});

Object.defineProperty(alasquel, "load", {
    value: async function load(option: ILoadOption, instance = AlaSequel){
        this.from("?");
        let data = [];
        if(option.hasOwnProperty("axios")){
            const response: any = await axios.get(option.axios.url);
            if(option.axios.hasOwnProperty("callback")){
                data = option.axios.callback(response);
            } else {
                data = response.data;
            }
        }

        if(option.hasOwnProperty("data")){
            data = option.data;
        }

        console.log(instance)
        this._dataset = data;
        return this;
    }
});

export {
    alasquel
};