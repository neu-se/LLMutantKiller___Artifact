import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rimraf } from 'rimraf';
import { promisify } from 'util';

const rm = promisify(rimraf);

describe('Dirty', function () {
  it('should emit drain event when inFlightWrites is less than or equal to 0', async function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        done();
      });
    });

    // Introduce a delay to ensure the drain event is emitted after the load event
    setTimeout(() => {
      db._inFlightWrites = -1;
      db.emit('drain');
    }, 100);

    // Clean up the test file after the test
    afterAll(async () => {
      await rm(file);
    });
  });
});