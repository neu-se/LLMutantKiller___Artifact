import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write multiple keys to disk', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');

    db.on('drain', () => {
      const contents = fs.readFileSync(filePath, 'utf-8');
      const expected = `${JSON.stringify({key: 'key1', val: 'value1'})}\n${JSON.stringify({key: 'key2', val: 'value2'})}\n${JSON.stringify({key: 'key3', val: 'value3'})}\n`;
      if (contents !== expected) {
        throw new Error(`Expected ${expected} but got ${contents}`);
      }
      fs.unlinkSync(filePath);
      done();
    });
  });
});