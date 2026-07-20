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

  it('should flush when queue has items and not waiting for drain', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set a value to populate the queue
      db.set('key1', 'value1');

      // Verify the flush happened by checking if file was written
      setTimeout(() => {
        const content = fs.readFileSync(testFile, 'utf-8');
        expect(content).toContain('key1');
        expect(content).toContain('value1');
        done();
      }, 50);
    });
  });
});