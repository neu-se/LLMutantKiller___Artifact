import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write multiple keys to disk in the correct order', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key1', 'value1', () => {
      db.set('key2', 'value2', () => {
        db.set('key3', 'value3');
        db.on('drain', () => {
          const contents = fs.readFileSync(filePath, 'utf-8');
          const lines = contents.split('\n');
          if (lines.length !== 4) {
            throw new Error(`Expected 4 lines but got ${lines.length}`);
          }
          if (lines[0] !== JSON.stringify({key: 'key1', val: 'value1'})) {
            throw new Error(`Expected key1 as the first line but got ${lines[0]}`);
          }
          if (lines[1] !== JSON.stringify({key: 'key2', val: 'value2'})) {
            throw new Error(`Expected key2 as the second line but got ${lines[1]}`);
          }
          if (lines[2] !== JSON.stringify({key: 'key3', val: 'value3'})) {
            throw new Error(`Expected key3 as the third line but got ${lines[2]}`);
          }
          fs.unlinkSync(filePath);
          done();
        });
      });
    });
  });
});