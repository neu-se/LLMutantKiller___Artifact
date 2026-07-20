import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should flush when queue is not empty and not waiting for drain', (done) => {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.set('key', 'value');
    db.set('key2', 'value2');

    db.on('drain', () => {
      db._waitForDrain = true;
      db.set('key3', 'value3');
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          done(err);
        } else {
          const lines = data.split('\n');
          expect(lines.length).toBe(3);
          expect(lines[0]).toBe(`{"key":"key","val":"value"}`);
          expect(lines[1]).toBe(`{"key":"key2","val":"value2"}`);
          expect(lines[2]).toBe(`{"key":"key3","val":"value3"}`);
          fs.unlinkSync(file);
          done();
        }
      });
    });
  });
});