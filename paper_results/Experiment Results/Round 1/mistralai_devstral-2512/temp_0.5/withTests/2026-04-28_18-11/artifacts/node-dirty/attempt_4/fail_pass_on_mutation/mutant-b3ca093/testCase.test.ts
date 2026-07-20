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

  it('should process queue when waitForDrain is true and queue is not empty', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // First write to fill the buffer and trigger waitForDrain
      const largeValue = 'x'.repeat(1024 * 1024);
      db.set('key1', largeValue);

      // Immediately queue another write while first is draining
      db.set('key2', 'value2');

      // The mutation would incorrectly return early when waitForDrain is true
      // even though there are items in the queue, preventing key2 from being written
      setTimeout(() => {
        expect(db.get('key2')).toBe('value2');

        const content = fs.readFileSync(testFile, 'utf-8');
        expect(content).toContain('key2');
        done();
      }, 100);
    });
  });
});