import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty loading row without key property', () => {
  it('should emit an error event when loading a row that has no key field', (done) => {
    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, `test-no-key-${Date.now()}.dirty`);

    // Write a row that has no 'key' field - just a val field
    fs.writeFileSync(filePath, JSON.stringify({ val: 'some value' }) + '\n', 'utf-8');

    const db = new Dirty(filePath);

    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
      // Clean up
      try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
      expect(err).toBeInstanceOf(Error);
      done();
    });

    db.on('load', () => {
      // Clean up
      try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
      if (!errorEmitted) {
        done(new Error('Expected error event to be emitted for row without key, but it was not'));
      }
    });
  });
});