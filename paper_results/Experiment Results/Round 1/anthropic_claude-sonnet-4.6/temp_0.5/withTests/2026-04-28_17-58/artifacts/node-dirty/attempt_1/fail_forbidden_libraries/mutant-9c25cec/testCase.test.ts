import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty loading corrupted row without key property', () => {
  it('should emit an error when loading a row that is missing the key property', (done) => {
    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, `test-no-key-${Date.now()}.dirty`);

    // Write a row that is valid JSON but missing the 'key' property
    fs.writeFileSync(filePath, '{"val":"somevalue"}\n', 'utf-8');

    const db = new Dirty(filePath);
    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('corrupted');
    });

    db.on('load', () => {
      try {
        fs.unlinkSync(filePath);
      } catch (e) { /* ignore */ }
      expect(errorEmitted).toBe(true);
      done();
    });
  });
});