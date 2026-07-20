import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close behavior with pending operations', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should wait for drain when there are both queued and in-flight writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Create a queued write with callback
      db.set('key1', 'value1', () => {});

      // Create an in-flight write without callback
      db.set('key2', 'value2');

      // Try to close while both queue and in-flight writes exist
      db.close();

      // Original code should wait for drain (queue.size || inFlightWrites > 0)
      // Mutated code would close immediately (queue.size && inFlightWrites > 0)
      db.on('write_close', () => {
        const content = fs.readFileSync(testFile, 'utf-8');
        expect(content).toContain('key1');
        expect(content).toContain('key2');
        done();
      });
    });
  });
});