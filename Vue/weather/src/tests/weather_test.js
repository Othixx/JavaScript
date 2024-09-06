// const axios=require('axios')
import axios from 'axios';

const params = {
    key: '39f2f7c0dc6c6a997f1b7afa1d1bd0b5',
    city: '610103',
    extensions: 'all'
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.get(
    'https://restapi.amap.com/v3/weather/weatherInfo?parameters', {
        // params: {
        //     key: '你的Key',
        //     city: '广州',
        //     extensions: 'all'
        // }
        params
    }
).then((res) => {
    console.log(res.data);
    console.log(res.data.forecasts[0].casts[0]);
}).catch((err) => {
    console.log(err);
})