import { IAlaSquel } from "interface/IAlaSquel";

const squel = require('squel');
const alasql = require("alasql");
const select2 = squel.select(); 


const defineProperty = function(select: any){
    Object.defineProperty(select, "has", {
        value: function has(relation: any){
            this._fk_ids = [];
            this._dataset.forEach((data: any) => {
                for (const key in relation) {
                    const relation_data = [{...data[key], "_fk": data._id}];
                    let rel: any = defineProperty(relation[key]().clone()).load(relation_data).field("_fk").get().map((row: any) => {
                        return row._fk;
                    });
                    if(rel.length > 0){
                        this._fk_ids.push(...rel)
                    }
                }
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
            console.log(this._fk_ids);
            if(this._fk_ids.length > 0){
                this.where("_id IN ?", this._fk_ids);
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


// const alasquel: IAlaSquel<any> = <IAlaSquel<any>>select;
export {
    alasquel,
    defineProperty
};