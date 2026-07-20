import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('flush behavior with queue and drain', () => {
  const testFile = path.join(__dirname, 'test-flush.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should not flush when _waitForDrain is true', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Force _waitForDrain to be true by filling the write buffer
      const largeValue = 'x'.repeat(1024 * 1024); // 1MB value to potentially fill buffer
      db.set('key1', largeValue);

      // Immediately try to set another value while first write is in progress
      const startTime = Date.now();
      db.set('key2', 'value2', (err) => {
        expect(err).toBeFalsy();
        const endTime = Date.now();

        // Verify both values were written (original behavior)
        const content = fs.readFileSync(testFile, 'utf-8');
        expect(content).toContain('key1');
        expect(content).toContain('key2');

        // Should complete relatively quickly in original code
        expect(endTime - startTime).toBeLessThan(1000);
        done();
      });
    });
  });
});