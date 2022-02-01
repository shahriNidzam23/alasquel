import { IAlaSquel } from "interface/IAlaSquel";
import { FileWatcherEventKind } from "typescript";

const squel = require('squel');
const alasql = require("alasql");
const select2 = squel.select(); 

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}
  

const defineProperty = function(select: any){
    Object.defineProperty(select, "has", {
        value: function has(relation: any){
            this._fk_ids = [];
            this._relation_dataset = {};
            this._dataset.forEach((data: any) => {
                for (const key in relation) {
                    if(!this._relation_dataset.hasOwnProperty(key)){
                        this._relation_dataset[key] = []
                    }
                    let relation_data:any = [{...data[key], _fk: data._id, _id: 0}];
                    if(Array.isArray(data[key])){
                        let i = -1;
                        relation_data = data[key].map((row: any) => {
                            i++;
                            return {...row, _fk: data._id, _id: i};
                        });
                    }
                    this._relation_dataset[key].push(...relation_data)
                }
            });

            for (const key in relation) {
                const define_rel = defineProperty(relation[key](alasquel()).clone());
                let rel: any = define_rel.load(this._relation_dataset[key]).field("_fk");
                console.log(rel.toString())
                this.where(`_id IN (${rel.toString()})`, "#alasequel#");
            }
            
            return this;
        }
    });
    
    Object.defineProperty(select, "row", {
        value: function row(index: number = 0){
            const query = replaceAll(this.toString(), "'#alasequel#'", '?');
            const dataAla = [this._dataset];
            for (const key in this._relation_dataset) {
                dataAla.push(this._relation_dataset[key]);
            }
            console.log(query);
            const data = alasql(query, dataAla);
            if(!data.length) return {}; 
            if(this.hasOwnProperty('_Model')) return new this._Model(data[index]);
    
            return data[index];
        }
    });
    
    Object.defineProperty(select, "get", {
        value: function get(){
            if(this._fk_ids.length > 0){
                this.where("_id IN ?", this._fk_ids);
            }
            const query = replaceAll(this.toString(), "'#alasequel#'", '?');
            let result = [];
            const dataAla = [this._dataset];
            for (const key in this._relation_dataset) {
                dataAla.push(this._relation_dataset[key]);
            }
            result =  alasql(query, dataAla);

            if(this.hasOwnProperty('_Model')){
                return result.map((row) => {
                    return new this._Model(row);
                });
            }
    
            return result;
        }
    });
    
    Object.defineProperty(select, "load", {
        value: function load(data: any, Model: any = null){
            this.from("?");
            this._fk_ids = [];
            this._relation_dataset = {};
            let i = -1;
            this._dataset = data.map((row: any) => {
                i++;
                return { ...row, "_id": i};
            });
            if(Model) this._Model = Model;
            return this;
        }
    });
    
    Object.defineProperty(select, "raw", {
        value: function raw(query: string){
            return alasql(query, [this._dataset]);
        }
    });

    return select;
}

const alasquel = function<T>(){
    return <IAlaSquel<T>> defineProperty(select2.clone());
}

const hasOne = function(Model: any, data: any){
    return new Model(data)
}

const hasMany = function(Model: any, data: any){
    return data.map((news: any) => {
        return new Model(news);
    });
}

// const alasquel: IAlaSquel<any> = <IAlaSquel<any>>select;
export {
    alasquel,
    hasOne,
    hasMany
};