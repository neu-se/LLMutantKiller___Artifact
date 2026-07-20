// Jest test file
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty drain event after write stream drain', () => {
  it('should emit drain event when write stream drains with inFlightWrites at 0', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      // Write a large value to trigger backpressure on the write stream
      // This forces _waitForDrain = true, and we need the drain event to fire
      const largeValue = 'x'.repeat(1024 * 1024); // 1MB string
      
      let drainReceived = false;
      
      db.on('drain', () => {
        drainReceived = true;
        expect(drainReceived).toBe(true);
        
        db.close();
        db.once('write_close', () => {
          rimraf(tmpDir).then(() => done()).catch(done);
        });
      });
      
      db.set('key1', largeValue);
    });
    
    db.on('error', done);
  }, 10000);
});