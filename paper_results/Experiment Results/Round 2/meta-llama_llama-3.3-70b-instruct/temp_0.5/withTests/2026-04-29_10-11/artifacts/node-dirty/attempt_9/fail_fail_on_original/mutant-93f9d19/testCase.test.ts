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
          expect(err).toBeInstanceOf(Error);
          expect(typeof err.message).toBe('string');
          expect(err.message).toMatch(/^Corrupted row at the end of the db:/);
          expect(db.listeners('error').length).toBe(1);
          done();
        });
      });
    });
  });
});