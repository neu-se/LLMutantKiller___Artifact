import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty - row missing key field', () => {
  it('should emit an error event when loading a row that has no key property', (done) => {
    const filePath = path.join(os.tmpdir(), `test-missing-key-${process.pid}.dirty`);

    // Write a row that is valid JSON but missing the 'key' field
    const rowWithoutKey = JSON.stringify({ val: 'somevalue' }) + '\n';
    fs.writeFileSync(filePath, rowWithoutKey, 'utf-8');

    const db = new Dirty(filePath);

    let errorEmitted = false;

    db.on('error', () => {
      errorEmitted = true;
    });

    db.on('load', () => {
      try {
        fs.unlinkSync(filePath);
      } catch (e) { /* ignore cleanup errors */ }
      expect(errorEmitted).toBe(true);
      done();
    });
  });
});