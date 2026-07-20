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

  it('should correctly handle queue processing when waitForDrain is true and queue has items', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Force the write stream into a draining state
      const largeValue = 'x'.repeat(1024 * 1024);
      db.set('key1', largeValue);

      // Queue multiple writes while first is draining
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // The mutation would cause _flush to return early when waitForDrain is true
      // even if there are items in the queue, preventing key2 and key3 from being written
      setTimeout(() => {
        expect(db.get('key2')).toBe('value2');
        expect(db.get('key3')).toBe('value3');

        const content = fs.readFileSync(testFile, 'utf-8');
        expect(content).toContain('key2');
        expect(content).toContain('key3');
        done();
      }, 200);
    });
  });
});