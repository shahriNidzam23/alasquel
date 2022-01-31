
import { IAlaSquel } from "interface/IAlaSquel";
import { alasquel } from "../src/services/squel/alasquel";

class Person {
    name: string;
    age: number;
    dob: string;
    gender: string;

    constructor(person: Person) {
        this.name = person.name;
        this.age = person.age;
        this.dob = person.dob;
        this.gender = person.gender;
    }

    static load(data: any) {
        return alasquel().load(data, this) as IAlaSquel<Person>;
    }

    test() {
        return "My Name is " + this.name;
    }
}

const data = [
    {
        name: "Shahrin Nidzam",
        age: 28,
        dob: "1994-12-05",
        gender: "male",
        skill: {
            name: "ts"
        },
        another: {
            name: "ts"
        },
        news: [
            {
                text: "ts"
            },
            {
                text: "tss"
            },
        ],
        test: [1, 2, 3]
    },
    {
        name: "Nidzam",
        age: 27,
        dob: "1995-12-05",
        gender: "male",
        skill: {
            name: "js"
        },
        another: {
            name: "ts"
        },
        news: [
            {
                text: "ts"
            },
        ],
        test: [4, 5, 6]
    },
    {
        name: "Arina",
        age: 28,
        dob: "1994-12-05",
        gender: "female",
        skill: {
            name: "php"
        },
        another: {
            name: "ts"
        },
        news: null,
        test: [7, 8, 9]
    }
];

const s = Person.load(data).has({
    skill: function () {
        return alasquel().where("name = 'php'");
    },
    another: function () {
        return alasquel().where("text = 'ts'");
    }
}).get();
console.log(s);