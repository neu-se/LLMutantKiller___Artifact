import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write to disk when _waitForDrain is false and _queue.size is greater than 0', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key1', 'value1');
    db.set('key2', 'value2');

    db.on('drain', () => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          done(err);
        } else {
          const lines = data.split('\n');
          expect(lines.length).toBe(3); // 2 lines for key-value pairs and 1 empty line
          expect(lines[0]).toBe(`{"key":"key1","val":"value1"}`);
          expect(lines[1]).toBe(`{"key":"key2","val":"value2"}`);
          done();
        }
      });
    });
  });
});