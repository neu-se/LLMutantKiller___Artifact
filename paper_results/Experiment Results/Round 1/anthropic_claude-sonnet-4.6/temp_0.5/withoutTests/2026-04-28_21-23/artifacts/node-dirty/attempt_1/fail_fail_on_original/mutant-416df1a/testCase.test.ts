// <Jest test file containing exactly one test case>
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error emission without callback', () => {
  it('should emit error when write fails and no callback is provided', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      // Close the write stream to force write errors
      db._writeStream.destroy();
      
      // Wait a tick for the stream to be destroyed
      setImmediate(() => {
        let errorEmitted = false;
        
        db.on('error', (err) => {
          errorEmitted = true;
          // Clean up
          rimraf(tmpDir).then(() => {
            done();
          });
        });
        
        // Set without a callback - cbs.length will be 0
        // Original: !cbs.length && err != null -> emits error
        // Mutated: cbs.length && err != null -> does NOT emit error
        db.set('testKey', { value: 'testValue' });
        
        // Give some time for the error to be emitted or not
        setTimeout(() => {
          if (!errorEmitted) {
            rimraf(tmpDir).then(() => {
              done(new Error('Expected error event was not emitted'));
            });
          }
        }, 500);
      });
    });
  });
});