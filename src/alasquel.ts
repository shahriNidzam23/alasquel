import { IAlaSquel } from "interface/IAlaSquel";

const squel = require('squel');
const alasql = require("alasql");
const select2 = squel.select(); 


const defineProperty = function(select: any){
    Object.defineProperty(select, "has", {
        value: function has(relation: any){
            this._fk_ids = [];
            this._dataset.forEach((data: any) => {
                let total_rel = 0;
                let found_rel = [];
                for (const key in relation) {
                    total_rel++;
                    let relation_data:any = [data[key]];
                    if(Array.isArray(data[key])){
                        relation_data = data[key];
                    }
                    const define_rel = defineProperty(relation[key]().clone());
                    let rel: any = define_rel.load(relation_data).get();
                    if(rel.length > 0) found_rel.push(1);
                }

                if(total_rel != found_rel.length) this._fk_ids.push(data._id)
            });
            
            return this;
        }
    });
    
    Object.defineProperty(select, "row", {
        value: function row(index: number = 0){
            const query = this.toString();
            const data = alasql(query, [this._dataset]);
            if(!data.length) return {}; 
            if(this.hasOwnProperty('_Model')) return new this._Model(data[index]);
    
            return data[index];
        }
    });
    
    Object.defineProperty(select, "get", {
        value: function get(){
            if(this._fk_ids.length > 0){
                this.where("_id NOT IN ?", this._fk_ids);
            }
            const query = this.toString();
            let result = [];
            result =  alasql(query, [this._dataset]);

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

const hasOne = function(data: any, Model: any){
    return new Model(data)
}

const hasMany = function(data: any, Model: any){
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