import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty - corrupted row missing key field', () => {
  it('should emit an error when a valid JSON row is missing the key field', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const filePath = path.join(tmpDir, 'test-missing-key.dirty');

    // Write a file with a row that is valid JSON but missing the 'key' property
    fs.writeFileSync(filePath, '{"val":"somevalue"}\n', 'utf-8');

    const db = new Dirty(filePath);
    let errorEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
    });

    db.on('load', () => {
      try {
        fs.unlinkSync(filePath);
        fs.rmdirSync(tmpDir);
      } catch (e) { /* ignore cleanup errors */ }

      expect(errorEmitted).toBe(true);
      done();
    });
  });
});