import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty empty line error message', () => {
  it('should emit an error with a non-empty message when an empty line is encountered in the database file', (done) => {
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `test-empty-line-${Date.now()}.dirty`);

    // Write a file with an empty line in the middle
    const content = '{"key":"a","val":"b"}\n\n{"key":"c","val":"d"}\n';
    fs.writeFileSync(tmpFile, content, 'utf-8');

    const db = new Dirty(tmpFile);

    db.on('error', (err: Error) => {
      // Clean up
      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }

      // The original code emits: 'Empty lines never appear in a healthy database'
      // The mutated code emits: ''
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      done();
    });

    db.on('load', () => {
      // If no error was emitted, the test should fail
      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
      done(new Error('Expected an error event to be emitted for empty line'));
    });
  });
});