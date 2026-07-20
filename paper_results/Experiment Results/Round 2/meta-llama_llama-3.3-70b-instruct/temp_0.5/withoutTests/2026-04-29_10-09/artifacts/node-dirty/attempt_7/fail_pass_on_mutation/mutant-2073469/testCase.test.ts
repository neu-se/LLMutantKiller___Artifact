import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit "drain" event when there are no in-flight writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      dirty.set('key', 'value');
      let eventCount = 0;
      dirty.on('drain', () => {
        eventCount++;
      });
      setTimeout(() => {
        expect(eventCount).toBeGreaterThan(0);
        fs.unlink(dbPath, () => {
          done();
        });
      }, 100);
    });
  });
});