import axios from 'axios';
import Config from '../config';

const { YOUTUBE_API } = Config;

const ajax = axios.create({
    baseURL: YOUTUBE_API.URL,
    params: {
      part: "snippet",
      key: YOUTUBE_API.KEY
    },
    headers: {},
});

export default ajax;
 