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

  it('should properly clean up resources when close is called', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Verify both streams exist before close
      expect(db._readStream).not.toBeNull();
      expect(db._writeStream).not.toBeNull();

      // Track if read_close was emitted
      let readCloseEmitted = false;
      db.on('read_close', () => {
        readCloseEmitted = true;
      });

      db.close();

      setImmediate(() => {
        // In original code, read stream should be destroyed
        // In mutated code, read stream won't be destroyed
        expect(db._readStream).toBeNull();
        expect(readCloseEmitted).toBe(true);
        done();
      });
    });
  });
});