import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method behavior', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: Dirty;

  beforeEach(() => {
    // Clean up any existing test file
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    // Clean up the test file
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should destroy read stream when close is called', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Verify read stream exists before close
      expect((db as any)._readStream).not.toBeNull();

      // Spy on the destroy method to verify it's called
      const destroySpy = jest.spyOn((db as any)._readStream, 'destroy');

      db.close();

      // Verify destroy was called on the read stream
      expect(destroySpy).toHaveBeenCalled();
      done();
    });
  });
});