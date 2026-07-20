import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with in-flight writes', () => {
  it('should wait for in-flight writes to complete before closing', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      let writeCallbackCalled = false;
      
      // Set a value with a callback - this triggers an in-flight write
      db.set('key1', { value: 'test' }, (err) => {
        writeCallbackCalled = true;
      });
      
      // Immediately close - in original code, this should wait for in-flight writes
      // In mutated code, if queue is empty but _inFlightWrites > 0, it won't wait
      db.once('write_close', () => {
        // After write stream closes, check if the data was actually written
        // In original: write completes, then close happens
        // In mutated: close may happen before write completes
        
        fs.readFile(dbPath, 'utf-8', (readErr, data) => {
          // Clean up
          rimraf(dbPath).catch(() => {});
          
          if (readErr) {
            // File might not exist if write didn't complete
            done(new Error('Database file not found - write may not have completed before close'));
            return;
          }
          
          // The data should contain our key
          try {
            expect(data).toContain('key1');
            expect(data).toContain('test');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      
      db.close();
    });
    
    db.on('error', (err) => {
      rimraf(dbPath).catch(() => {});
      done(err);
    });
  });
});