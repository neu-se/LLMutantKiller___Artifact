import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

describe('dirty empty line error handling', () => {
  it('should emit an error when loading a db file containing an empty line', (done) => {
    const tmpDir = os.tmpdir();
    const testFile = path.join(tmpDir, `dirty-test-empty-line-${process.pid}.dirty`);

    // Write a db file with an empty line (which is considered corrupted)
    const content = '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n';
    fs.writeFileSync(testFile, content, 'utf-8');

    // Dynamically require to get fresh instance
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const db = new Dirty(testFile);

    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Empty lines never appear in a healthy database');
      
      // Cleanup
      try { fs.unlinkSync(testFile); } catch (e) { /* ignore */ }
      done();
    });

    db.on('load', () => {
      // Cleanup
      try { fs.unlinkSync(testFile); } catch (e) { /* ignore */ }
      
      if (!errorEmitted) {
        done(new Error('Expected an error event for empty line in db file, but none was emitted'));
      }
    });
  });
});