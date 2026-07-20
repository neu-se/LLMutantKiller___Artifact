import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close behavior with only in-flight writes', () => {
  const testFile = path.join(__dirname, 'test-close-inflight.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should wait for drain when there are only in-flight writes (no queue)', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Create an in-flight write without callback (no queue entry)
      db.set('key1', 'value1');

      // Immediately try to close while write is in flight but queue is empty
      // Original: if (this._queue.size || this._inFlightWrites > 0) - will wait
      // Mutated: if (this._queue.size && this._inFlightWrites > 0) - won't wait
      db.close();

      // Verify write completed before close
      db.on('write_close', () => {
        const content = fs.readFileSync(testFile, 'utf-8');
        expect(content).toContain('key1');
        done();
      });
    });
  });
});