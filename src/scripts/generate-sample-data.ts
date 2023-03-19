import fs from 'fs';
import path from 'path';
import Fetcher from '../model/fetcher';
import { mkdirp } from 'mkdirp';

/**
 * This script provide the ability to create sample data
 * so we can develop a thing even without internet
 * */

const folderName = 'sample-data';
const dir = path.resolve(path.join(__dirname, '..', '..', folderName));

class GenerateData {
  constructor(private username: string) {
    mkdirp.sync(dir);
  }

  public async gather(): Promise<void> {
    console.log('Generating Sample data');

    const ff = await new Fetcher({
      username: this.username
    });
    const stats = await ff.doFetchStats();
    const info = await ff.doFetchInfo();

    this.save('stats', stats);
    this.save('info', info);

    console.log('Generated');
  }

  private save(name: string, data: object): void {
    const loc = path.join(dir, `${name}.json`);
    const options = {};

    fs.writeFileSync(loc, JSON.stringify(data, null, 2), options);
  }

  public static data<T>(name: string): T {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(dir, `${name}.json`), {
          encoding: 'utf8',
          flag: 'r'
        })
      );
    } catch (err) {
      throw new TypeError(`File ${name} probably does not exists`);
    }
  }
}

export const execute = () => {
  new GenerateData('jxmked').gather().then(() => {
    process.exit(0);
  });
};

export default GenerateData;
