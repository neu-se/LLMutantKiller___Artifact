import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should handle corrupted row', (done) => {
    const tempDir = fs.mkdtempSync('dirty-test-');
    const filePath = path.join(tempDir, 'test.db');
    const dirty = new Dirty(filePath);

    dirty.on('load', () => {
      fs.appendFileSync(filePath, '{"key":"test","val":null}\n{"key":"test2"}');
      dirty.close();
    });

    dirty.on('error', (err) => {
      expect(err.message).toBe('Could not load corrupted row: {"key":"test2"}');
      fs.unlinkSync(filePath);
      fs.rmdirSync(tempDir);
      done();
    });

    dirty.on('close', () => {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        expect(data).not.toContain('Stryker was here!');
      }
      fs.unlinkSync(filePath);
      fs.rmdirSync(tempDir);
      done();
    });
  }, 10000);
});