import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('+ readFile()', () => {
  it('should parse JSON correctly when options is a string', (done) => {
    const file = path.join(__dirname, 'test.json');
    const obj = { name: 'JP' };
    fs.writeFileSync(file, JSON.stringify(obj));

    readFile(file, 'utf8', (err, data) => {
      expect(err).toBeNull();
      expect(data).toEqual(obj);
      rimraf.sync(file);
      done();
    });
  });
});