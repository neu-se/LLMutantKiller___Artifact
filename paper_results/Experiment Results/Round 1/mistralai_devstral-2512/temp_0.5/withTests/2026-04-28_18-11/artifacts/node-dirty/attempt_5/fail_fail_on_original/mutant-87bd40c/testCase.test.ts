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

  it('should destroy read stream when close is called with pending operations', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Add some data to ensure we have a read stream
      db.set('key', 'value');
      db.on('drain', () => {
        // Verify read stream exists
        expect(db._readStream).not.toBeNull();

        // Force close while there are pending operations
        db._queue.set('test', [() => {}]);
        db.close();

        // Check that read stream was destroyed
        setImmediate(() => {
          expect(db._readStream).toBeNull();
          done();
        });
      });
    });
  });
});