import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close behavior with pending operations', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
  let db: any;
  let closeCalled = false;

  beforeEach(() => {
    rimraf.sync(testFile);
    closeCalled = false;
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should not close immediately when there are only in-flight writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Create an in-flight write without callback (no queue entry)
      db.set('key1', 'value1');

      // Try to close while write is in flight but queue is empty
      db.close();

      // Original code should wait for drain (queue.size || inFlightWrites > 0)
      // Mutated code would close immediately (queue.size && inFlightWrites > 0)
      setImmediate(() => {
        // If mutated, write_close would have fired immediately
        // If original, write_close should fire after drain
        if (!closeCalled) {
          done();
        } else {
          done(new Error('Close was called too early (mutation detected)'));
        }
      });

      db.on('write_close', () => {
        closeCalled = true;
        const content = fs.readFileSync(testFile, 'utf-8');
        if (!content.includes('key1')) {
          done(new Error('Data was not written before close'));
        }
      });
    });
  });
});