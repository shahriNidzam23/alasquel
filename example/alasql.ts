const alasql = require("alasql");
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


var res = alasql("SELECT * FROM ? WHERE news->[0]->text = ?",[data, 'ts']);   