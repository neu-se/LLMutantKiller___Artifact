import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error emission without callbacks', () => {
  it('should emit error event when write fails and no callback is provided', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.once('load', () => {
      // Listen for error event - this should be emitted when write fails with no cb
      db.once('error', (err) => {
        // Clean up
        rimraf(tmpDir).then(() => {
          // Error was emitted as expected in original code
          expect(err).toBeTruthy();
          done();
        });
      });
      
      // Set a timeout to fail if error is never emitted (mutant behavior)
      const timeout = setTimeout(() => {
        rimraf(tmpDir).then(() => {
          done(new Error('Expected error event was never emitted (mutant detected)'));
        });
      }, 2000);
      
      // Override the error listener to clear timeout on success
      db.removeAllListeners('error');
      db.once('error', (err) => {
        clearTimeout(timeout);
        rimraf(tmpDir).then(() => {
          expect(err).toBeTruthy();
          done();
        });
      });
      
      // Destroy the write stream to force a write error
      if (db._writeStream) {
        db._writeStream.destroy(new Error('Simulated write error'));
      }
      
      // Set a value WITHOUT a callback - this triggers the !cbs.length path
      db.set('testKey', { value: 'testValue' });
    });
  });
});