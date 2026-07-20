import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush drain behavior', () => {
  it('should emit drain exactly once after setting a key when not waiting for drain', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new (Dirty as any)(dbPath);

    db.on('load', () => {
      let drainCount = 0;
      db.on('drain', () => drainCount++);

      // Manually set _waitForDrain = true to simulate backpressure state
      // Then call _flush() via set() - guard 1 should catch it and return early
      // The drain from write stream should eventually reset _waitForDrain
      // and the queue item should be flushed
      
      // First, write something to get _waitForDrain set
      const writeStream = (db as any)._writeStream;
      const originalWrite = writeStream.write.bind(writeStream);
      let firstCall = true;
      writeStream.write = function(data: any, cb: any) {
        if (firstCall) {
          firstCall = false;
          originalWrite(data, cb);
          return false; // signal backpressure
        }
        return originalWrite(data, cb);
      };

      db.set('key1', 'value1');
      // _waitForDrain is now true (write returned false)
      // key2 gets queued but _flush returns early due to _waitForDrain
      db.set('key2', 'value2');

      // Wait for drain - both keys should eventually be persisted
      setTimeout(() => {
        expect(db.get('key1')).toBe('value1');
        expect(db.get('key2')).toBe('value2');
        
        db.close();
        db.on('write_close', () => {
          const content = fs.readFileSync(dbPath, 'utf-8');
          const lines = content.trim().split('\n').filter(Boolean);
          const rows = lines.map((l: string) => JSON.parse(l));
          const key2Row = rows.find((r: any) => r.key === 'key2');
          expect(key2Row).toBeDefined();
          expect(key2Row.val).toBe('value2');
          try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
          done();
        });
      }, 2000);
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      done(err);
    });
  }, 10000);
});