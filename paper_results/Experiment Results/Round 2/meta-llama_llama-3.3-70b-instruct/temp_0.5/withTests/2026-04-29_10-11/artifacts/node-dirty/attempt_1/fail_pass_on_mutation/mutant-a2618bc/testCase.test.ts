import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', function () {
  it('should write multiple entries to disk', function (done) {
    const filePath = path.join(process.cwd(), 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key1', 'value1');
    db.set('key2', 'value2');

    db.on('drain', () => {
      const contents = fs.readFileSync(filePath, 'utf-8');
      const expectedContents = `${JSON.stringify({key: 'key1', val: 'value1'})}\n${JSON.stringify({key: 'key2', val: 'value2'})}\n`;
      if (contents!== expectedContents) {
        throw new Error(`Expected contents to be ${expectedContents}, but got ${contents}`);
      }
      db.close();
      fs.unlinkSync(filePath);
      done();
    });
  });
});