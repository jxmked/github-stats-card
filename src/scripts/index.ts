import { execute as dataGenerator } from './generate-sample-data';

const args = Array.from(process.argv).slice(2);

if (args.indexOf('need-sample-data') !== -1) {
  dataGenerator();
}
