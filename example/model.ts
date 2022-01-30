import { AlaSequel } from "../src/AlaSequel";

class Person extends AlaSequel {
    name: string;
    age: string;
    dob: string;
    gender: string;
}

const data = [
    {
        name: "Shahrin Nidzam",
        age: "28",
        dob: "1994-12-05",
        gender: "male",
        skill: ["ts", "js"],
        test: {
            data: 1
        }
    },
    {
        name: "Nidzam",
        age: "27",
        dob: "1995-12-05",
        gender: "male",
        skill: ["java", ".net"],
        test: {
            data: 2
        }
    },
    {
        name: "Arina",
        age: "28",
        dob: "1994-12-05",
        gender: "female",
        skill: ["php"],
        test: {
            data: 3
        }
    }
];

(async () => {
    const s = (await Person.load({data})).where("test = 3").get();
    console.log(s);
})();