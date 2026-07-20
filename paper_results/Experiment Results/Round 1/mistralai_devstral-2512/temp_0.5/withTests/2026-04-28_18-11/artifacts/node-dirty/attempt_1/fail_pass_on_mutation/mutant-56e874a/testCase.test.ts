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

  it('should flush pending writes when queue is not empty and not waiting for drain', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to ensure queue has items
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Verify data is written to file
      setTimeout(() => {
        const content = fs.readFileSync(testFile, 'utf-8');
        expect(content).toContain('key1');
        expect(content).toContain('value1');
        expect(content).toContain('key2');
        expect(content).toContain('value2');
        expect(content).toContain('key3');
        expect(content).toContain('value3');
        done();
      }, 100);
    });
  });
});