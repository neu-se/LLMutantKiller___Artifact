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

  it('should properly clean up read stream when close is called', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Verify read stream exists before close
      expect(db._readStream).not.toBeNull();

      // Listen for read_close event
      db.on('read_close', () => {
        // After read_close, the stream should be null
        expect(db._readStream).toBeNull();
        done();
      });

      db.close();
    });
  });
});