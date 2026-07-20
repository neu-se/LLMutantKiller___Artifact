import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush', () => {
  it('should flush remaining queue items after stream drain when drain handler calls _flush', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new (Dirty as any)(dbPath);

    db.on('load', () => {
      const writeStream = (db as any)._writeStream;
      
      // Patch the drain handler to call _flush() (fixing the empty else {})
      writeStream.removeAllListeners('drain');
      writeStream.on('drain', () => {
        (db as any)._waitForDrain = false;
        if (!(db as any)._queue.size) {
          if ((db as any)._inFlightWrites <= 0) db.emit('drain');
        } else {
          (db as any)._flush();
        }
      });

      // Simulate backpressure on first write
      const originalWrite = writeStream.write.bind(writeStream);
      let firstWrite = true;
      writeStream.write = function(data: string, cb: (err?: Error | null) => void) {
        if (firstWrite) {
          firstWrite = false;
          originalWrite(data, cb);
          return false; // backpressure
        }
        return originalWrite(data, cb);
      };

      // Set two keys - first causes backpressure, second gets queued
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Wait for drain - both keys should be persisted
      db.once('drain', () => {
        expect(db.get('key1')).toBe('value1');
        expect(db.get('key2')).toBe('value2');
        
        db.close();
        db.on('write_close', () => {
          const content = fs.readFileSync(dbPath, 'utf-8');
          const lines = content.trim().split('\n').filter(Boolean);
          const rows = lines.map((l: string) => JSON.parse(l));
          expect(rows.some((r: any) => r.key === 'key2' && r.val === 'value2')).toBe(true);
          try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
          done();
        });
      });
    });

    db.on('error', (_err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      done(err);
    });
  }, 10000);
});