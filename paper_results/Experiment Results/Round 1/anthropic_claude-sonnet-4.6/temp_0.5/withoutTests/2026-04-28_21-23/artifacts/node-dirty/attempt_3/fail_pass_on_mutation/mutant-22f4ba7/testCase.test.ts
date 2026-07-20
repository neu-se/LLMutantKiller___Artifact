import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('Dirty close with pending writes', () => {
  it('should defer close until after drain when queue is non-empty, then emit write_close only once all data is flushed', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    try {
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Test timed out'));
        }, 5000);

        const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
        const db = new Dirty(dbPath);

        db.on('load', () => {
          // Pause the write stream to force items to stay in the queue
          // This ensures _queue.size > 0 when close() is called
          (db as any)._writeStream.cork();

          // Queue up writes while the stream is corked
          for (let i = 0; i < 10; i++) {
            db.set(`key${i}`, { value: `data${i}`, index: i });
          }

          // Uncork so writes can proceed, but immediately call close
          // At this point _queue still has items or _inFlightWrites > 0
          (db as any)._writeStream.uncork();

          // Force _waitForDrain = true so _flush won't drain the queue
          // by filling the queue again before close
          (db as any)._waitForDrain = true;

          // Now close - original will wait for drain, mutant won't
          db.close();

          // Manually trigger drain to allow original to proceed
          (db as any)._waitForDrain = false;
          (db as any)._writeStream?.emit('drain');

          db.on('write_close', () => {
            clearTimeout(timeout);

            const db2 = new Dirty(dbPath);
            db2.on('load', (count: number) => {
              try {
                expect(count).toBe(10);
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