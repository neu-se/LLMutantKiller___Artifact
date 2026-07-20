import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close method behavior', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: any;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should destroy read stream when close is called with empty queue', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Verify read stream exists before close
      expect(db._readStream).not.toBeNull();

      // Ensure queue is empty and no pending writes
      expect(db._queue.size).toBe(0);
      expect(db._inFlightWrites).toBe(0);

      // Listen for read_close event
      db.on('read_close', () => {
        // After read_close, verify the stream was destroyed
        expect(db._readStream).toBeNull();
        done();
      });

      // Close with empty queue
      db.close();
    });
  });
});