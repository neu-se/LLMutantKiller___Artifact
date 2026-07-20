import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty empty line error handling', () => {
  it('should emit an error when loading a db file containing an empty line', (done) => {
    const testFile = path.join(os.tmpdir(), `dirty-test-empty-line-${process.pid}.dirty`);

    // Write a db file with an empty line (which is considered corrupted in original code)
    const content = '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n';
    fs.writeFileSync(testFile, content, 'utf-8');

    const db = new Dirty(testFile);

    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Empty lines never appear in a healthy database');
      try { fs.unlinkSync(testFile); } catch (e) { /* ignore */ }
      done();
    });

    db.on('load', () => {
      try { fs.unlinkSync(testFile); } catch (e) { /* ignore */ }
      if (!errorEmitted) {
        done(new Error('Expected an error event for empty line in db file, but none was emitted'));
      }
    });
  });
});