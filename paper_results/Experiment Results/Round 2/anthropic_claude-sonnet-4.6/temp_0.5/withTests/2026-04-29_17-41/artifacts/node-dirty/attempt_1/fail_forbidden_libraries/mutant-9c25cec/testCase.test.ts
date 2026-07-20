import { jest } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty loading corrupted row missing key field', () => {
  it('should emit an error when a row is valid JSON but missing the key field', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const filePath = path.join(tmpDir, 'test.dirty');

    // Write a file with a row that has valid JSON but no 'key' property
    fs.writeFileSync(filePath, '{"val":"somevalue"}\n', 'utf-8');

    const db = new Dirty(filePath);
    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
      expect(err.message).toMatch(/Could not load corrupted row/);
    });

    db.on('load', () => {
      expect(errorEmitted).toBe(true);
      // Cleanup
      try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
      try { fs.rmdirSync(tmpDir); } catch (e) { /* ignore */ }
      done();
    });
  });
});