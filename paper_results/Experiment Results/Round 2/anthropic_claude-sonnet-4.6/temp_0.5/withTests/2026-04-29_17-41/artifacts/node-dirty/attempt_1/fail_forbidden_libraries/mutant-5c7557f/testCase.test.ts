import { describe, it } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty drain event via stream backpressure', () => {
  it('should emit drain when write stream drains with empty queue and no in-flight writes', async () => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-drain-test-${Date.now()}.dirty`);

    try {
      const DirtyModule = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
      const Dirty = DirtyModule.Dirty || DirtyModule;
      const db = new Dirty(file);

      await new Promise<void>((resolve) => db.on('load', () => resolve()));

      // Intercept write to simulate backpressure
      const ws = db._writeStream;
      const origWrite = ws.write.bind(ws);
      let intercepted = false;

      ws.write = function(data: any, cb: any) {
        const result = origWrite(data, cb);
        if (!intercepted) {
          intercepted = true;
          // Force backpressure state
          db._waitForDrain = true;
          db._inFlightWrites = 0; // ensure in-flight is 0 so drain path triggers
          return false;
        }
        return result;
      };

      const drainPromise = new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('drain event never emitted')), 5000);
        db.on('drain', () => {
          clearTimeout(timeout);
          resolve();
        });
      });

      db.set('foo', 'bar');

      await drainPromise;
    } finally {
      try { fs.unlinkSync(file); } catch (_) {}
    }
  });
});