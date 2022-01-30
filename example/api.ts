import { AlaSequel } from '../src/AlaSequel';

(async () => {
    const res: any = await AlaSequel.load({
        axios: {
            url: 'https://restcountries.com/v2/all',
            callback: function(response: any) {
                return response.data
            }
        }
    });
    const s = res.where("alpha2Code = 'MY'").row();
    console.log(s);
})();