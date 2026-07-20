import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', function () {
  it('should handle writes correctly when the write stream is waiting for drain', function (done) {
    const filePath = path.join(process.cwd(), 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');

    db._writeStream.cork();
    db.set('key4', 'value4');

    db.on('drain', () => {
      db._writeStream.uncork();
      const contents = fs.readFileSync(filePath, 'utf-8');
      const lines = contents.split('\n');
      if (lines.length!== 5) {
        throw new Error(`Expected 5 lines, but got ${lines.length}`);
      }
      if (JSON.parse(lines[0]).key!== 'key1' || JSON.parse(lines[1]).key!== 'key2' || JSON.parse(lines[2]).key!== 'key3' || JSON.parse(lines[3]).key!== 'key4') {
        throw new Error('Expected writes to be in the correct order');
      }
      db.close();
      fs.unlinkSync(filePath);
      done();
    });
  });
});