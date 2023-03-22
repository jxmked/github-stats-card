import fs from 'fs';
import path from 'path';

/**
 * Fetching info from data folder
 *
 * The json must be a constant and cannot be altered
 * */

export type IJSONData = object;

export default class Data {
  private readonly pathToData = path.resolve(path.join(__dirname, '..', '..', 'data'));
  private jsonData: IJSONData;

  constructor(name: string) {
    this.jsonData = {};

    this.parseJson(name);
  }

  public getData<T>(key: keyof IJSONData): T {
    return this.jsonData[key] as T;
  }

  private parseJson(name: string): void {
    const absPath = path.join(this.pathToData, name);

    try {
      const json = fs.readFileSync(this.pathToData, 'utf8');
      this.jsonData = JSON.parse(json);
    } catch (err) {
      throw new Error(`Error while parsing ${absPath} file`);
    }
  }
}
