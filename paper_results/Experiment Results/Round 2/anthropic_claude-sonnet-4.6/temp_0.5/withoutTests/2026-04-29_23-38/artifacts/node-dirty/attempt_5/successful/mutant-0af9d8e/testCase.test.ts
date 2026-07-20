import { promises as fsPromises } from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event with write stream backpressure', () => {
  it('should emit drain when write stream drains with empty queue and zero in-flight writes', async () => {
    const tmpDir = await fsPromises.mkdtemp(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    try {
      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(dbPath);

        db.on('error', (err: Error) => reject(err));

        db.on('load', () => {
          const timeout = setTimeout(() => {
            reject(new Error('Timed out: drain event was never emitted'));
          }, 5000);

          // Wait for a normal drain first to ensure all writes are done
          db.once('drain', () => {
            // Now state: _inFlightWrites=0, _queue empty, _waitForDrain=false
            // Manually simulate the backpressure scenario:
            // Set _waitForDrain=true to prevent drain from write callback path
            // Then trigger write stream drain with _inFlightWrites=0
            const dbInternal = db as any;
            
            // Ensure clean state
            dbInternal._inFlightWrites = 0;
            dbInternal._waitForDrain = true; // simulate backpressure state
            dbInternal._queue.clear(); // ensure queue is empty

            // Now listen for the drain that should come from the write stream handler
            db.once('drain', () => {
              clearTimeout(timeout);
              resolve();
            });

            // Trigger write stream drain - this should hit the mutation path
            dbInternal._writeStream.emit('drain');
          });

          db.set('key1', 'value1');
        });
      });
    } finally {
      try {
        await fsPromises.rm(tmpDir, { recursive: true, force: true });
      } catch (_) {}
    }
  });
});