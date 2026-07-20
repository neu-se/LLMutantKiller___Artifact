import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit drain event after writing to the database', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('drain', () => {
      // If the drain event is not emitted after writing to the database,
      // the test will timeout and fail.
      fs.readFile('test.db', (err, data) => {
        if (err) {
          done(err);
        } else {
          dirty.close();
          rimraf.sync('test.db');
          done();
        }
      });
    });
    dirty.set('key', 'value', () => {
      // The drain event should be emitted after writing to the database.
    });
  });
});