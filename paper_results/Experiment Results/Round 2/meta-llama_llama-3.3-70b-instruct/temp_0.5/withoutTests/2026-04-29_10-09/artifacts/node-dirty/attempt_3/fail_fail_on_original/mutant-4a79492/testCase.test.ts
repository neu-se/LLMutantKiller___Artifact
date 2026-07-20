import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event when queue is empty', (done) => {
    const db = new Dirty('test.db');
    db.on('load', () => {
      db.set('test', 'value', () => {
        db.on('drain', () => {
          expect(db._queue.size).toBe(0);
          db.close();
          fs.unlink('test.db', (err) => {
            if (err) {
              throw err;
            }
            done();
          });
        });
        db.set('test2', 'value2');
      });
    });
  });
});