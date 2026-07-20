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

  it('should destroy read stream when close is called immediately after load', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Verify read stream exists
      expect(db._readStream).not.toBeNull();

      // Close immediately after load
      db.close();

      // Check that read stream was destroyed
      setImmediate(() => {
        expect(db._readStream).toBeNull();
        done();
      });
    });
  });
});