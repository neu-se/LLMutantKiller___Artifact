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

          db.once('drain', () => {
            clearTimeout(timeout);
            resolve();
          });

          // Set a value to trigger a write
          db.set('key1', 'value1', () => {
            // Write callback has fired: _inFlightWrites is now 0
            // But we need to simulate the case where _waitForDrain was true
            // so drain wasn't emitted from the callback.
            // Manually set _waitForDrain = true and _inFlightWrites = 0,
            // then trigger the write stream drain event manually.
            const dbInternal = db as any;
            dbInternal._waitForDrain = true;
            dbInternal._inFlightWrites = 0;
            // Now emit 'drain' on the write stream to trigger the handler
            dbInternal._writeStream.emit('drain');
          });
        });
      });
    } finally {
      try {
        await fsPromises.rm(tmpDir, { recursive: true, force: true });
      } catch (_) {}
    }
  });
});