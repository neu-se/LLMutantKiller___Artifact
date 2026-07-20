import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty empty line error message', () => {
  it('should emit an error with a specific non-empty message when an empty line is encountered in the database file', (done) => {
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `test-empty-line-${process.pid}.dirty`);

    // Write a file with an empty line in it
    const content = '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n';
    fs.writeFileSync(tmpFile, content, 'utf-8');

    let errorMessage: string | null = null;

    const db = new Dirty(tmpFile);

    db.on('error', (err: Error) => {
      errorMessage = err.message;
    });

    db.on('load', () => {
      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }

      // The original code emits: 'Empty lines never appear in a healthy database'
      // The mutated code emits: ''
      expect(errorMessage).not.toBeNull();
      expect(errorMessage).toBe('Empty lines never appear in a healthy database');
      done();
    });
  });
});