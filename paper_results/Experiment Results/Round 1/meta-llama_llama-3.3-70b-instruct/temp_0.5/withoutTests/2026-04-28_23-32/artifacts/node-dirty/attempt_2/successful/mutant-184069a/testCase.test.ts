import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('should emit error event when file exists but is not readable', (done) => {
    const filePath = 'test-dirty.db';
    fs.writeFileSync(filePath, 'test data');

    // Make the file not readable
    fs.chmodSync(filePath, 0o200);

    const dirty = new Dirty(filePath);
    dirty.on('error', (err) => {
      expect(err.code).toBe('EACCES');
      done();
    });
  });
});