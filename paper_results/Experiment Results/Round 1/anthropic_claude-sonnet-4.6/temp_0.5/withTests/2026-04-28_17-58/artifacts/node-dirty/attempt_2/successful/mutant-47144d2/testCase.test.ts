import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty - empty line error handling', () => {
  it('should emit an error when loading a db file containing empty lines', (done) => {
    const tmpDir = os.tmpdir();
    const testFile = path.join(tmpDir, `dirty-test-empty-line-${process.pid}.dirty`);

    // Write a db file that contains an empty line (which should never appear in a healthy db)
    const content = '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n';
    fs.writeFileSync(testFile, content, 'utf-8');

    const db = new Dirty(testFile);

    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Empty lines never appear in a healthy database');
      try { fs.unlinkSync(testFile); } catch (_) {}
      done();
    });

    db.on('load', () => {
      try { fs.unlinkSync(testFile); } catch (_) {}
      if (!errorEmitted) {
        done(new Error('Expected an error event for empty lines, but none was emitted'));
      }
    });
  });
});