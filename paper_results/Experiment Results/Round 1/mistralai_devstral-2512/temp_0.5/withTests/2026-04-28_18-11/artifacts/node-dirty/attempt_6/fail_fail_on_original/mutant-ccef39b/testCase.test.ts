import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close behavior with pending operations', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
  let db: any;
  let writeCloseFired = false;
  let drainFired = false;

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, ignore error
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, ignore error
    }
  });

  it('should wait for drain when there are only in-flight writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Create an in-flight write without callback (no queue entry)
      db.set('key1', 'value1');

      // Try to close while write is in flight but queue is empty
      db.close();

      // Original code should wait for drain (queue.size || inFlightWrites > 0)
      // Mutated code would close immediately (queue.size && inFlightWrites > 0)
      db.on('drain', () => {
        drainFired = true;
      });

      db.on('write_close', () => {
        writeCloseFired = true;
        // If drain fired before write_close, the mutation is present
        if (drainFired) {
          done(new Error('Mutation detected: close fired before drain completed'));
        } else {
          // Verify file was written
          try {
            const content = fs.readFileSync(testFile, 'utf-8');
            if (content.includes('key1')) {
              done();
            } else {
              done(new Error('Data was not written correctly'));
            }
          } catch (err) {
            done(new Error('File not found after close'));
          }
        }
      });
    });
  });
});