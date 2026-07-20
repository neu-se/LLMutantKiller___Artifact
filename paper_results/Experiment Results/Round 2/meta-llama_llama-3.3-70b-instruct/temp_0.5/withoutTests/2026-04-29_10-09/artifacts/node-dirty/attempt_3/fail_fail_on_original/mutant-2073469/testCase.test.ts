import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit "drain" event when there are no in-flight writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    let loadCalled = false;
    dirty.on('load', () => {
      loadCalled = true;
    });
    dirty.on('drain', () => {
      if (!loadCalled) {
        throw new Error('Drain event emitted before load event');
      }
      expect(true).toBe(true);
      fs.unlink(dbPath, () => {
        done();
      });
    });
    dirty.set('key', 'value');
  });
});