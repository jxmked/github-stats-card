import dotenv from 'dotenv';

dotenv.config();

import Fetcher from './data-fetcher/fetcher';

import fs from 'fs';

const ff = new Fetcher({
  username: 'jxmked'
});

ff.doFetchStats()
  .then((res) => {
    fs.writeFileSync('data.json', JSON.stringify(res));
  })
  .catch((err) => {
    console.log('err');
  });

export {};
