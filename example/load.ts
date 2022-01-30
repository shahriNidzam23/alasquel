import { AlaSequel } from '../src/AlaSequel';

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

(async () => {
    const s = (await AlaSequel.load({data})).where("age = '28'").row();
    console.log(s);
})();