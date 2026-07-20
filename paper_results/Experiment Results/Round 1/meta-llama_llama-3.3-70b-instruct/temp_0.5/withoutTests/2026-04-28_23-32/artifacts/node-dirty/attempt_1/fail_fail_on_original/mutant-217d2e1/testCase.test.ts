import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit an error when loading corrupted row', (done) => {
    const tempDir = fs.mkdtempSync('dirty-test-');
    const filePath = path.join(tempDir, 'test.db');
    const dirty = new Dirty(filePath);

    dirty.on('error', (err) => {
      expect(err.message).toBe('Could not load corrupted row: {"key":"test"}');
      fs.unlinkSync(filePath);
      fs.rmdirSync(tempDir);
      done();
    });

    dirty.on('load', () => {
      fs.appendFileSync(filePath, '{"key":"test"}\n');
    });
  });
});