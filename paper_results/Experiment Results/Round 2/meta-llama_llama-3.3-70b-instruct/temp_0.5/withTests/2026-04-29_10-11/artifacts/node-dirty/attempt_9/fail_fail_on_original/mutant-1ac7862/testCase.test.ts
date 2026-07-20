import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write multiple keys to disk and handle queue correctly', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');
    db.set('key4', 'value4');

    let count = 0;
    db.on('drain', () => {
      count++;
      if (count === 1) {
        db.set('key5', 'value5');
      }
    });

    setTimeout(() => {
      const contents = fs.readFileSync(filePath, 'utf-8');
      const lines = contents.split('\n');
      if (lines.length !== 5) {
        throw new Error(`Expected 5 lines but got ${lines.length}`);
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
      if (lines[3] !== JSON.stringify({key: 'key4', val: 'value4'})) {
        throw new Error(`Expected key4 as the fourth line but got ${lines[3]}`);
      }
      fs.unlinkSync(filePath);
      done();
    }, 100);
  });
});