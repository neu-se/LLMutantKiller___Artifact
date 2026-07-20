import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty db', () => {
  it('should emit error for empty lines in database file', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-error-test-${process.pid}.dirty`);
    fs.writeFileSync(tmpFile, '{"key":"a","val":"1"}\n\n{"key":"b","val":"2"}\n');
    const db = new Dirty(tmpFile);
    db.on('error', (err: Error) => {
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done();
    });
  });
});