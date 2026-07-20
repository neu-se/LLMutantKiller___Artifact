import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('+ readFile()', () => {
  it('should throw an error when options is a string without encoding', (done) => {
    const file = path.join(__dirname, 'test.json');
    const obj = { name: 'JP' };
    fs.writeFileSync(file, JSON.stringify(obj));

    readFile(file, 'invalid', (err, data) => {
      expect(err).not.toBeNull();
      rimraf.sync(file);
      done();
    });
  });
});