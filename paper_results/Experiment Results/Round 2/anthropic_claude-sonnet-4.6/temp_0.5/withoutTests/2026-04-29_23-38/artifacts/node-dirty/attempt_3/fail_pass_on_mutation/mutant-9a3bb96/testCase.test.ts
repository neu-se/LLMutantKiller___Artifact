import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with pending writes', () => {
  it('should persist all queued writes to disk before closing', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Use a fresh db instance
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Intercept write to make it slow by pausing the stream after first write
      // so that subsequent sets go into _queue without being flushed
      const writeStream = (db as any)._writeStream;

      // Pause the write stream so writes pile up in the queue
      writeStream.cork();

      // Set values while stream is corked - these go into _queue
      for (let i = 0; i < 5; i++) {
        db.set(`key${i}`, { value: `data${i}` });
      }

      // Uncork to allow the internal _flush to proceed, but immediately call close
      // The queue should still have items or in-flight writes
      writeStream.uncork();

      // Call close right away - original code should wait for drain
      // Mutated code will close immediately, losing pending writes
      db.close();

      db.on('write_close', () => {
        try {
          const fileContent = fs.readFileSync(dbPath, 'utf-8');
          const lines = fileContent.trim().split('\n').filter((l: string) => l.length > 0);

          // All 5 writes must be persisted
          expect(lines.length).toBe(5);

          const keys = lines.map((line: string) => JSON.parse(line).key);
          for (let i = 0; i < 5; i++) {
            expect(keys).toContain(`key${i}`);
          }

          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        } catch (err) {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done(err);
        }
      });
    });

    db.on('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});