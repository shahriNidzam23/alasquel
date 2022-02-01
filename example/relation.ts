
import { IAlaSquel } from "interface/IAlaSquel";
import { alasquel, hasOne, hasMany } from "../src/alasquel";



class News {
    text: string;

    constructor(skill: News) {
        this.text = skill.text;
    }

    static load(data: any) {
        return alasquel().load(data, this) as IAlaSquel<News>;
    }

    test(){
        return "asdasda";
    }
}

class Skill {
    name: string;

    constructor(skill: Skill) {
        this.name = skill.name;
    }

    static load(data: any) {
        return alasquel().load(data, this) as IAlaSquel<Skill>;
    }
}

class Person {
    name: string;
    age: number;
    dob: string;
    gender: string;
    skill: Skill;
    news: Array<News>;
    test: Array<string>;
    hello: string;

    constructor(person: Person) {
        this.name = person.name;
        this.age = person.age;
        this.dob = person.dob;
        this.gender = person.gender;
        this.skill = hasOne(Skill, person.skill);
        this.news = hasMany(News, person.news);
        this.test = person.test;
        this.hello = this.greeting();
    }

    static load(data: any) {
        return alasquel().load(data, this) as IAlaSquel<Person>;
    }

    greeting() {
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
        news: [
            {
                text: "tsss"
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
        news: [],
        test: [7, 8, 9]
    }
];

const s = Person.load(data)
.has({
    skill: function (query: any) {
        return query.where("name = 'js'");
    },
    news: function (query: any) {
        return query.where("text = 'ts'");
    }
})
.where('test->[0] = 4').row();
console.log(s);