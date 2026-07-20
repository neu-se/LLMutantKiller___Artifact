import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', function () {
  it('should handle multiple concurrent writes correctly', function (done) {
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
      if (lines[0] !== JSON.stringify({key: 'key1', val: 'value1'}) &&
          lines[1] !== JSON.stringify({key: 'key1', val: 'value1'}) &&
          lines[2] !== JSON.stringify({key: 'key1', val: 'value1'})) {
        throw new Error(`Expected first line to be ${JSON.stringify({key: 'key1', val: 'value1'})}`);
      }
      if (lines[0] !== JSON.stringify({key: 'key1', val: 'value1'}) &&
          lines[1] !== JSON.stringify({key: 'key2', val: 'value2'}) &&
          lines[2] !== JSON.stringify({key: 'key2', val: 'value2'})) {
        throw new Error(`Expected second line to be ${JSON.stringify({key: 'key2', val: 'value2'})}`);
      }
      if (lines[0] !== JSON.stringify({key: 'key1', val: 'value1'}) &&
          lines[1] !== JSON.stringify({key: 'key2', val: 'value2'}) &&
          lines[2] !== JSON.stringify({key: 'key3', val: 'value3'})) {
        throw new Error(`Expected third line to be ${JSON.stringify({key: 'key3', val: 'value3'})}`);
      }
      db.close();
      fs.unlinkSync(filePath);
      done();
    });
  });
});