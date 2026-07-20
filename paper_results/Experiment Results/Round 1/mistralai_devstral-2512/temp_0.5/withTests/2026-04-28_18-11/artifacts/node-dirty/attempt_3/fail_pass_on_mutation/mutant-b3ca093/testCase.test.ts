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

  it('should process queue when waitForDrain is false but queue has items', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Set up a scenario where _waitForDrain is false but queue has items
      db.set('key1', 'value1');

      // Force immediate processing by setting another value
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