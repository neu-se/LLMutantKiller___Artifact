import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', function () {
  it('should correctly handle multiple writes to the same key', function (done) {
    const filePath = path.join(process.cwd(), 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key1', 'value1');
    db.set('key1', 'value2');
    db.set('key1', 'value3');

    db.on('drain', () => {
      const contents = fs.readFileSync(filePath, 'utf-8');
      const lines = contents.split('\n');
      if (lines.length!== 4) {
        throw new Error(`Expected 4 lines, but got ${lines.length}`);
      }
      if (lines[0]!== JSON.stringify({key: 'key1', val: 'value1'})) {
        throw new Error(`Expected first line to be ${JSON.stringify({key: 'key1', val: 'value1'})}, but got ${lines[0]}`);
      }
      if (lines[1]!== JSON.stringify({key: 'key1', val: 'value2'})) {
        throw new Error(`Expected second line to be ${JSON.stringify({key: 'key1', val: 'value2'})}, but got ${lines[1]}`);
      }
      if (lines[2]!== JSON.stringify({key: 'key1', val: 'value3'})) {
        throw new Error(`Expected third line to be ${JSON.stringify({key: 'key1', val: 'value3'})}, but got ${lines[2]}`);
      }
      db.close();
      fs.unlinkSync(filePath);
      done();
    });
  });
});