import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant-b3ca093 test case', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should handle concurrent writes correctly when queue is full and drain is needed', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Fill the write buffer to trigger drain
      const largeValue = 'x'.repeat(1024 * 1024); // 1MB value to fill buffer
      db.set('key1', largeValue);
      db.set('key2', largeValue);
      db.set('key3', largeValue);

      // This write should be queued while previous writes are draining
      db.set('key4', 'value4', (err) => {
        expect(err).toBeFalsy();
        expect(db.get('key4')).toBe('value4');

        // Verify all writes completed
        expect(db.get('key1')).toBe(largeValue);
        expect(db.get('key2')).toBe(largeValue);
        expect(db.get('key3')).toBe(largeValue);

        // Verify file contains all entries
        const content = fs.readFileSync(testFile, 'utf-8');
        expect(content).toContain('key1');
        expect(content).toContain('key2');
        expect(content).toContain('key3');
        expect(content).toContain('key4');

        done();
      });
    });
  });
});