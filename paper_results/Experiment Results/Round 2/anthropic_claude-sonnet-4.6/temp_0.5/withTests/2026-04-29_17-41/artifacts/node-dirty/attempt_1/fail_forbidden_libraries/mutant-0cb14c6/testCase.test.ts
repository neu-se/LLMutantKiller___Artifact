import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('drain event after write stream backpressure', () => {
  it('should emit drain event when inFlightWrites reaches 0 after write stream drains', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.dirty`);

    // Clean up before
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    let drainFired = false;
    const timeout = setTimeout(() => {
      cleanup();
      done(new Error('drain event was never fired - this indicates the mutation is present'));
    }, 5000);

    function cleanup() {
      clearTimeout(timeout);
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
    }

    db.on('load', () => {
      // Write a large number of large values to force write stream backpressure
      // This should cause _waitForDrain to become true, triggering the drain handler
      const largeValue = 'x'.repeat(65536); // 64KB per entry
      
      let writesCompleted = 0;
      const numWrites = 20;
      
      function onWriteComplete() {
        writesCompleted++;
        // We don't rely on individual write callbacks; we rely on the db drain event
      }

      // Set many large values to force backpressure
      for (let i = 0; i < numWrites; i++) {
        db.set(`key${i}`, largeValue + i, onWriteComplete);
      }

      db.once('drain', () => {
        drainFired = true;
        cleanup();
        done();
      });
    });
  });
});