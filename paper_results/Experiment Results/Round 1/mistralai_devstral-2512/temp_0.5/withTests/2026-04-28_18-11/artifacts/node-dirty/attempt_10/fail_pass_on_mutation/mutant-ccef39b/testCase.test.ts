import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close behavior with pending operations', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
  let db: any;
  let events: string[] = [];

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, ignore error
    }
    events = [];
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

      // Track events in order
      db.on('drain', () => {
        events.push('drain');
      });

      db.on('write_close', () => {
        events.push('write_close');
        // Verify the order: drain should fire before write_close
        if (events[0] === 'drain' && events[1] === 'write_close') {
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
        } else {
          done(new Error('Incorrect event order - mutation detected'));
        }
      });

      // Try to close while write is in flight but queue is empty
      db.close();

      // Check if write_close fires immediately (mutation behavior)
      setImmediate(() => {
        if (events.includes('write_close') && !events.includes('drain')) {
          done(new Error('Mutation detected: write_close fired before drain'));
        }
      });
    });
  });
});