import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event after two set operations', (done) => {
    const dbPath = 'test-dirty.db';
    const dirty = new Dirty(dbPath);
    let drainCount = 0;
    dirty.on('drain', () => {
      drainCount++;
    });

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        // do nothing
      });
    });

    // Wait for a short period of time
    setTimeout(() => {
      expect(drainCount).toBe(1);
      dirty.close();
      fs.unlinkSync(dbPath);
      done();
    }, 10);
  });
});