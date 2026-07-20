import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rmSync } from 'fs';
import { join } from 'path';

describe('Dirty', function () {
  it('should emit drain event when inFlightWrites is less than or equal to 0', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.set('key2', 'value2', () => {
          db._inFlightWrites = -1;
          db._flush();
          done();
        });
      });
    });

    // Clean up the test file after the test
    afterAll(() => {
      rmSync(file);
    });
  });
});