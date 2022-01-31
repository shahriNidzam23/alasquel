import { IAlaSquel } from "interface/IAlaSquel";
import { alasquel } from "../src/services/squel/alasquel";

class Person {
    name: string;
    age: number;
    dob: string;
    gender: string;

    constructor(person: Person){
        this.name = person.name;
        this.age = person.age;
        this.dob = person.dob;
        this.gender = person.gender;
    }

    static load(data: any){
        return alasquel.clone().load(data, this) as IAlaSquel<Person>;
    }

    test(){
        return  "My Name is " + this.name;
    }
}

const data = [
    {
        name: "Shahrin Nidzam",
        age: 28,
        dob: "1994-12-05",
        gender: "male"
    },
    {
        name: "Nidzam",
        age: 27,
        dob: "1995-12-05",
        gender: "male"
    },
    {
        name: "Arina",
        age: 28,
        dob: "1994-12-05",
        gender: "female"
    }
];

// const s = alasquel.load(data, Person).where("name = 'Arina'").row();
const s = Person.load(data).where("name = 'Arina'").row();
console.log(s.test());