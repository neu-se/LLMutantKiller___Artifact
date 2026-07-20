import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush waitForDrain guard', () => {
  it('should not write to stream when _waitForDrain is true, preventing double-cork/uncork issues', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Monkey-patch the write stream to simulate backpressure on first write
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let writeCount = 0;
      
      db._writeStream.write = function(data, cb) {
        writeCount++;
        if (writeCount === 1) {
          // Simulate backpressure: return false to set _waitForDrain = true
          originalWrite(data, cb);
          return false;
        }
        return originalWrite(data, cb);
      };

      // Set a key - this triggers _flush, which will set _waitForDrain = true
      db.set('key1', 'value1');
      
      // At this point _waitForDrain should be true
      // Now call set again - in original code, _flush returns early due to _waitForDrain guard
      // In mutated code, _flush proceeds and calls cork/uncork again without proper state
      db.set('key2', 'value2');

      // The drain event should eventually fire and all data should be readable
      db.on('drain', () => {
        // Verify both keys are in memory
        const val1 = db.get('key1');
        const val2 = db.get('key2');
        
        expect(val1).toBe('value1');
        expect(val2).toBe('value2');
        
        db.close();
        db.on('write_close', () => {
          // Verify data was persisted correctly to disk
          const content = fs.readFileSync(dbPath, 'utf-8');
          const lines = content.trim().split('\n').filter(Boolean);
          
          // Each key should appear at least once
          const rows = lines.map(l => JSON.parse(l));
          const key1Row = rows.find(r => r.key === 'key1');
          const key2Row = rows.find(r => r.key === 'key2');
          
          expect(key1Row).toBeDefined();
          expect(key1Row.val).toBe('value1');
          expect(key2Row).toBeDefined();
          expect(key2Row.val).toBe('value2');
          
          rimraf(tmpDir).then(() => done()).catch(done);
        });
      });
    });

    db.on('error', done);
  });
});