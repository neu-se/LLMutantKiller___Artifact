import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should not emit drain event immediately after setting a value and then waiting', (done) => {
    const dbPath = 'test-dirty.db';
    const dirty = new Dirty(dbPath);
    let drainEmitted = false;
    dirty.on('drain', () => {
      drainEmitted = true;
    });

    dirty.set('key', 'value', () => {
      // do nothing
    });

    // Wait for a short period of time
    setTimeout(() => {
      expect(drainEmitted).toBe(false);
      dirty.close();
      fs.unlinkSync(dbPath);
      done();
    }, 100);
  });
});