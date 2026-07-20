import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rmSync } from 'fs';

describe('Dirty', function () {
  afterAll(() => {
    try {
      rmSync('test.dirty');
    } catch (err) {
      // Ignore error if file does not exist
    }
  });

  it('should emit drain event when inFlightWrites is less than or equal to 0', function (done) {
    this.timeout(10000);
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value', () => {
        db.set('key2', 'value2', () => {
          db._inFlightWrites = 1;
          db._flush();
          db.on('drain', () => {
            db._inFlightWrites = -1;
            db._flush();
            done();
          });
        });
      });
    });
  }, 10000);
});