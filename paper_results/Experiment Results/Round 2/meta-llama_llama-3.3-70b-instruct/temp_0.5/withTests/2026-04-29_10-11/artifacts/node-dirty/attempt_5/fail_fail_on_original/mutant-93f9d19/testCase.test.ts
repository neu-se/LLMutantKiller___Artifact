import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', function () {
  it('should emit "error" event with a valid string when a corrupted row is found at the end of the db', function (done) {
    const db = new Dirty('test.dirty');
    db.on('load', () => {
      fs.appendFile('test.dirty', '{"key":"test2"', (err) => {
        if (err) {
          throw err;
        }
        db.on('error', (err) => {
          expect(err.message).toBe('Corrupted row at the end of the db: {"key":"test2');
          done();
        });
        db.close();
      });
    });
  });
});