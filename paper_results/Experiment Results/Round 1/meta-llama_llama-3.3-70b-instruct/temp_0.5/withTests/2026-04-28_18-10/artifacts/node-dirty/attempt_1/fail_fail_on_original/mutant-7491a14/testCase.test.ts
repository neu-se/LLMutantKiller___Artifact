import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Dirty db', function () {
  it('should throw an error when encoding is not specified for read stream', async function (done) {
    const filePath = path.join(__dirname, 'test.dirty');
    rimraf.sync(filePath);

    try {
      const db = new Dirty(filePath);
      await new Promise((resolve) => db.on('load', resolve));
      db.set('key', 'value');
      await new Promise((resolve) => db.on('drain', resolve));
      const contents = fs.readFileSync(filePath, 'utf8');
      expect(contents).toBe(`${JSON.stringify({key: 'key', val: 'value'})}\n`);
      done();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      done();
    } finally {
      rimraf.sync(filePath);
    }
  });
});