import { IAlaSquel } from "interface/IAlaSquel";
import { alasquel } from "../src/services/squel/alasquel";
const axios = require('axios').default;

class Country {
    alpha2Code: string;
    alpha3Code: string;

    constructor(country: Country) {
        this.alpha2Code = country.alpha2Code;
        this.alpha3Code = country.alpha3Code;
    }

    static load(data: any) {
        return <IAlaSquel<Country>>alasquel.load(data, this);
    }

    code() {
        return this.alpha2Code;
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

(async() => {
    const countries: any = new Promise((resolve, reject) => {
        axios.get("https://restcountries.com/v2/all").then((response) => {
            resolve(Country.load(response.data))
        });
    })
    const s = (await countries).where("alpha2Code = 'MY'").row();
    console.log(s.code());

})();