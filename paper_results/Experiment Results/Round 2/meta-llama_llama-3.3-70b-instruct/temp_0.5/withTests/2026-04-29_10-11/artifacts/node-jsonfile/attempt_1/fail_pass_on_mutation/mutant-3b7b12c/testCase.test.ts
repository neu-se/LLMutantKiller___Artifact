import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('+ readFile()', () => {
  it('should throw an error when options is a string', () => {
    const file = path.join(__dirname, 'test.json');
    const obj = { name: 'JP' };
    fs.writeFileSync(file, JSON.stringify(obj));

    expect(() => readFileSync(file, 'utf8')).not.toThrow();

    rimraf.sync(file);
  });
});