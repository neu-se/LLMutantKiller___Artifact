import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('empty line in database file emits error event', () => {
  it('should emit error event when database file contains an empty line', (done) => {
    const tmpDir = os.tmpdir();
    const dbFile = path.join(tmpDir, `test-empty-line-${Date.now()}.dirty`);

    // Write a database file with an empty line in it
    // The empty line should trigger the error emission
    const content = '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n';
    fs.writeFileSync(dbFile, content, 'utf-8');

    const db = new Dirty(dbFile);
    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      // Clean up
      try { fs.unlinkSync(dbFile); } catch (e) { /* ignore */ }
      
      expect(errorEmitted).toBe(true);
      done();
    });
  });
});