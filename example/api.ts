import { alasquel } from '../src/alasquel';
const axios = require('axios').default;

(async () => {
    const response: any = await axios.get("https://restcountries.com/v2/all");
    const s = alasquel().load(response.data).where("alpha2Code = 'MY'").row();
    console.log(s);
})();