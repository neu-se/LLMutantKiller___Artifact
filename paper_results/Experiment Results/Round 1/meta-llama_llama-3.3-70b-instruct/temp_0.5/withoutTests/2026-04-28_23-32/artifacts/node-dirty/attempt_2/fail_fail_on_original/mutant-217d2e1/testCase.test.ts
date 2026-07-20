import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not return a string when loading corrupted row', (done) => {
    const tempDir = fs.mkdtempSync('dirty-test-');
    const filePath = path.join(tempDir, 'test.db');
    const dirty = new Dirty(filePath);

    dirty.on('load', () => {
      fs.appendFileSync(filePath, '{"key":"test"}\n');
      dirty._load();
    });

    dirty.on('error', (err) => {
      expect(err.message).not.toBe('Stryker was here!');
      fs.unlinkSync(filePath);
      fs.rmdirSync(tempDir);
      done();
    });
  });
});