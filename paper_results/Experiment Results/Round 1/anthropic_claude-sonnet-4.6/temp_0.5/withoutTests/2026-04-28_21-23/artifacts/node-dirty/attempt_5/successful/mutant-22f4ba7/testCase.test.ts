import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('Dirty close', () => {
  it('should persist all queued writes when close is called while writes are pending', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    try {
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Test timed out'));
        }, 5000);

        const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
        
        // First, create and populate a db, then close it cleanly
        const db = new Dirty(dbPath);
        db.on('load', () => {
          // Write enough large values to trigger backpressure (waitForDrain=true)
          // so subsequent sets stay in _queue
          const largeValue = 'x'.repeat(64 * 1024); // 64KB per write
          
          // This first write should trigger backpressure
          db.set('key0', largeValue);
          
          // These writes happen while _waitForDrain may be true,
          // so they stay in _queue
          db.set('key1', 'value1');
          db.set('key2', 'value2');
          
          // Now close - if _queue.size > 0 or _inFlightWrites > 0:
          // Original: waits for drain, then closes (all data persisted)
          // Mutant: closes immediately (queued items lost)
          db.close();
          
          db.on('write_close', () => {
            clearTimeout(timeout);
            
            // Reload and check all keys exist
            const db2 = new Dirty(dbPath);
            db2.on('load', (count: number) => {
              try {
                expect(count).toBe(3);
                expect(db2.get('key1')).toBe('value1');
                expect(db2.get('key2')).toBe('value2');
                db2.close();
                resolve();
              } catch (err) {
                db2.close();
                reject(err);
              }
            });
            db2.on('error', (err: Error) => reject(err));
          });
        });

        db.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(err);
        });
      });
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});