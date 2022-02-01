import { alasquel } from '../src/alasquel';

const data = [
    {
        name: "Shahrin Nidzam",
        age: "28",
        dob: "1994-12-05",
        gender: "male",
    },
    {
        name: "Nidzam",
        age: "27",
        dob: "1995-12-05",
        gender: "male",
    },
    {
        name: "Arina",
        age: "28",
        dob: "1994-12-05",
        gender: "female",
    }
];

const s = alasquel().load(data).where("age = '28'").row();
console.log(s);