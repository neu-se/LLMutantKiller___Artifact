import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', function () {
  it('should write to disk in the correct order when multiple writes are pending', function (done) {
    const filePath = path.join(process.cwd(), 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');

    db.on('drain', () => {
      const contents = fs.readFileSync(filePath, 'utf-8');
      const lines = contents.split('\n');
      if (lines.length !== 4) {
        throw new Error(`Expected 4 lines, but got ${lines.length}`);
      }
      if (JSON.parse(lines[0]).key !== 'key1' || JSON.parse(lines[1]).key !== 'key2' || JSON.parse(lines[2]).key !== 'key3') {
        throw new Error('Expected writes to be in the correct order');
      }
      db.close();
      fs.unlinkSync(filePath);
      done();
    });
  });
});