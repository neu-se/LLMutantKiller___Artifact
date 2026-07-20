import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should not write to disk when queue is empty and waiting for drain', (done) => {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.set('key', 'value');
    db.on('drain', () => {
      db._waitForDrain = true;
      db.set('key2', undefined);
      db.on('drain', () => {
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) {
            done(err);
          } else {
            const lines = data.split('\n');
            expect(lines.length).toBe(2); // 1 line for the key-value pair and 1 empty line
            expect(lines[0]).toBe(`{"key":"key","val":"value"}`);
            expect(lines[1]).toBe(`{"key":"key2","val":null}`);
            fs.unlinkSync(file);
            done();
          }
        });
      });
    });
  });
});