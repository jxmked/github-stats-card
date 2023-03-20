import path from 'path';
import fs from 'fs';

/**
 * Get svg file and return it as string
 * */

export const FOLDER = 'dynamic-svgs';

export const SVGGetter = (dir: string): string => {
  dir = dir.endsWith('.svg') ? dir : dir + '.svg';

  const fullPath: string = path.resolve(
    __dirname, '..', '..', '..', FOLDER, dir
  );

  try {
    return fs.readFileSync(fullPath, 'utf8').toString();
  } catch (err) {
    throw new TypeError(`SVG path '${fullPath}' does not exists`);
  }
};
