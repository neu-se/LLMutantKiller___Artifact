import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty drain event after backpressure', () => {
  it('should emit drain event when write stream drains with empty queue and no in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Wait for a normal set/drain cycle first to ensure write stream is ready
      db.set('testKey', 'testValue', () => {
        // Now simulate the backpressure scenario:
        // 1. Set _waitForDrain = true (as if write returned false)
        // 2. Set _inFlightWrites = 0 (write callback already fired)
        // 3. Emit 'drain' on the write stream
        // This should trigger the mutated code path
        db._waitForDrain = true;
        db._inFlightWrites = 0;
        
        db.once('drain', () => {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        });

        // Simulate the write stream draining with empty queue
        db._writeStream.emit('drain');
      });
    });

    db.on('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});