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

  it('should process queue when waitForDrain is true OR queue is empty', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // First write to fill the buffer and trigger waitForDrain
      const largeValue = 'x'.repeat(1024 * 1024);
      db.set('key1', largeValue, () => {
        // At this point waitForDrain should be true
        // Now queue another write - this should still be processed
        db.set('key2', 'value2', (err) => {
          expect(err).toBeFalsy();
          expect(db.get('key2')).toBe('value2');

          // Verify both keys were written to file
          const content = fs.readFileSync(testFile, 'utf-8');
          expect(content).toContain('key1');
          expect(content).toContain('key2');
          done();
        });
      });
    });
  });
});