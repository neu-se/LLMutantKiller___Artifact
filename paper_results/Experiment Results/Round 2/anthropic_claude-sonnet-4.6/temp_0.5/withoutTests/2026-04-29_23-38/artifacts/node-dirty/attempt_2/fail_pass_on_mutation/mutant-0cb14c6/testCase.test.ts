import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty drain event after write stream drain', () => {
  it('should emit drain event when write stream drains with inFlightWrites equal to 0', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      // Write a very large value to force backpressure (write() returns false)
      // This sets _waitForDrain = true, stopping further flushes
      // When the stream drains, the drain handler fires
      // With _inFlightWrites === 0 at that point, original emits 'drain', mutant doesn't
      const largeValue = 'x'.repeat(256 * 1024);
      
      db.once('drain', () => {
        try {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch (e) {}
        done();
      });
      
      // Single large write to trigger backpressure
      db.set('bigkey', largeValue);
    });
    
    db.on('error', (err: Error) => {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (e) {}
      done(err);
    });
  }, 15000);
});