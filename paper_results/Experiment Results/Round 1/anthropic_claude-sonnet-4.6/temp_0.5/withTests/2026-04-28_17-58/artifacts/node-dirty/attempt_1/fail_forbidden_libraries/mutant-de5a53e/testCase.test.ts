import { describe, it, expect } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('close() destroys write stream', () => {
  it('should emit write_close event after close() is called', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${process.pid}-${Date.now()}.dirty`);

    const db = new (Dirty as any)(file);

    db.on('load', () => {
      db.set('key1', 'value1', () => {
        db.close();
      });
    });

    db.on('write_close', () => {
      // Verify that _writeStream is null after write_close (destroy was called)
      expect(db._writeStream).toBeNull();
      // Clean up
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done();
    });
  });
});