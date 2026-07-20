import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('close() waits for in-flight writes', () => {
  it('should wait for in-flight writes before closing when queue is empty but writes are pending', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-inflight-${Date.now()}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new (Dirty as any)(file);

    db.on('load', () => {
      // Set a value - this will flush the queue immediately (queue becomes empty)
      // but _inFlightWrites will be > 0 until the write callback fires
      db.set('testKey', 'testValue');

      // Call close() immediately after set, before the write callback fires
      // Original: checks _inFlightWrites > 0, so it waits for drain
      // Mutated: ignores _inFlightWrites, closes immediately
      db.close();
    });

    db.on('write_close', () => {
      // After write stream is closed, verify the data was persisted
      const contents = fs.readFileSync(file, 'utf-8');
      
      try {
        fs.unlinkSync(file);
      } catch (e) { /* ignore */ }

      // The data should have been written before close
      expect(contents).toContain('"testKey"');
      expect(contents).toContain('"testValue"');
      done();
    });
  });
});