
import { IAlaSquel } from "interface/IAlaSquel";
import { alasquel } from "../src/services/squel/alasquel";



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

    constructor(person: Person) {
        this.name = person.name;
        this.age = person.age;
        this.dob = person.dob;
        this.gender = person.gender;
        this.skill = new Skill(person.skill);
        this.news = person.news.map((news: News) => {
            return new News(news);
        });
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
        another: {
            name: "tss"
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
            name: "tss"
        },
        news: null,
        test: [7, 8, 9]
    }
];

const s = Person.load(data).has({
    skill: function () {
        return alasquel().where("name = 'js'");
    },
    news: function () {
        return alasquel().where("text = 'ts'");
    }
}).row();
console.log(s.news[0].test());