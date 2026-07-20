import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with pending writes', () => {
  it('should defer close until drain event fires when there are pending writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const events: string[] = [];

      db.on('drain', () => {
        events.push('drain');
      });

      db.on('write_close', () => {
        events.push('write_close');

        // In the original: drain fires first (close waits for drain, then closes)
        // In the mutated: write_close fires without drain having fired first
        expect(events[0]).toBe('drain');
        expect(events[1]).toBe('write_close');

        fs.rmSync(tmpDir, { recursive: true });
        done();
      });

      // Set a value to create a pending write, providing a callback
      // so _inFlightWrites > 0 or _queue.size > 0 when close() is called
      db.set('key1', { value: 'data1' });
      db.set('key2', { value: 'data2' });
      db.set('key3', { value: 'data3' });

      // Call close immediately - before writes have completed
      db.close();
    });
  });
});