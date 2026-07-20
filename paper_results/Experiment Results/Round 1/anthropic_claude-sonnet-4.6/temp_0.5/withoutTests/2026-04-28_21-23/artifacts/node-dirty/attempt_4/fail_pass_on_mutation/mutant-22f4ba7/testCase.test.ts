import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('Dirty close', () => {
  it('should call write callbacks before write_close even when close is called immediately after set', async () => {
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
          const callbacksFired: string[] = [];
          const events: string[] = [];

          db.on('drain', () => events.push('drain'));
          db.on('write_close', () => {
            events.push('write_close');
            clearTimeout(timeout);
            try {
              // In original: drain fires before write_close (close waits for drain)
              // In mutant: write_close fires without drain having fired first
              expect(events.indexOf('drain')).toBeLessThan(events.indexOf('write_close'));
              resolve();
            } catch (err) {
              reject(err);
            }
          });

          // Set values - these go into the queue and trigger _flush
          // _flush starts writing, incrementing _inFlightWrites
          // We call close() synchronously before the write callbacks fire
          db.set('key1', { a: 1 }, () => callbacksFired.push('key1'));
          db.set('key2', { b: 2 }, () => callbacksFired.push('key2'));
          db.set('key3', { c: 3 }, () => callbacksFired.push('key3'));

          // Call close synchronously - _inFlightWrites > 0 at this point
          // Original: registers drain listener, returns early
          // Mutant: calls _writeStream.end() immediately
          db.close();
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