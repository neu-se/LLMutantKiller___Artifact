import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty loading row without key field', () => {
  it('should emit an error when loading a row that has no key property', (done) => {
    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, `test-no-key-${Date.now()}.dirty`);

    // Write a row that is valid JSON but has no 'key' field
    const corruptRow = JSON.stringify({ val: 'somevalue' }) + '\n';
    fs.writeFileSync(filePath, corruptRow, 'utf-8');

    const db = new Dirty(filePath);

    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
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