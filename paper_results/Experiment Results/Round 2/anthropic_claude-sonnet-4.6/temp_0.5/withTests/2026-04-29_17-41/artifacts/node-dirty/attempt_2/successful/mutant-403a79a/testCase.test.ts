import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty empty line error message', () => {
  it('should emit an error with the correct non-empty message when an empty line is encountered in the database file', (done) => {
    const tmpFile = path.join(os.tmpdir(), `test-empty-line-${process.hrtime.bigint()}.dirty`);

    // Write a file with an empty line in the middle (two consecutive newlines)
    const content = '{"key":"a","val":"b"}\n\n{"key":"c","val":"d"}\n';
    fs.writeFileSync(tmpFile, content, 'utf-8');

    const db = new Dirty(tmpFile);
    let finished = false;

    db.on('error', (err: Error) => {
      if (finished) return;
      finished = true;

      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }

      // Original: 'Empty lines never appear in a healthy database'
      // Mutated:  ''
      expect(err.message.length).toBeGreaterThan(0);
      done();
    });

    db.on('load', () => {
      if (finished) return;
      finished = true;

      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
      done(new Error('Expected an error event for the empty line, but got load instead'));
    });
  });
});