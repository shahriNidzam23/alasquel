import * as _ from 'lodash';

function flattenObject(ob) {
    var toReturn = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

// function flatten(arr) {
//     var toReturn = [];

//     arr.forEach(element => {
        
//     });
//     return toReturn;
// }



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
                text: "ts"
            },
            {
                text: "tss"
            },
        ],
        test: [1,2,3]
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
        test: [4,5,6]
    },
    {
        name: "Arina",
        age: 28,
        dob: "1994-12-05",
        gender: "female",
        skill: {
            name: "php"
        },
        news: null,
        test: [7,8,9]
    }
];

var flatten = data.map((row: any) => {
    return flattenObject(row);
});

console.log(flatten);

// const result = _.flatMap(data, ({ name, age, dob, gender, skill, news, test }) =>
//   _.map(tags, tag => ({ name, ...tag }))
// );

// console.log(result);
