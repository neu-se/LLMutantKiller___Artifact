import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event', () => {
  it('should emit drain after set completes without a file path (in-memory)', (done) => {
    // Without a path, drain is emitted via setImmediate in set()
    // This tests the basic drain contract
    const db = new (Dirty as any)();

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });

    db.on('load', () => {
      db.set('key1', 'value1', () => {
        // After callback, drain should have been emitted
        expect(drainCount).toBeGreaterThan(0);
        done();
      });
    });
  });
});