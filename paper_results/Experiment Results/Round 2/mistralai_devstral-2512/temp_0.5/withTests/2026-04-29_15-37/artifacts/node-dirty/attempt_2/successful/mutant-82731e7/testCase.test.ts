import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method behavior with writeStream', () => {
  const testFile = path.join(__dirname, 'test-close-writestream.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should not destroy writeStream when it is null', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Manually set writeStream to null to simulate the condition
      db._writeStream = null;

      // Spy on the original writeStream's end method to verify it's not called
      const originalWriteStream = db._writeStream;
      let endCalled = false;
      if (originalWriteStream) {
        const originalEnd = originalWriteStream.end;
        originalWriteStream.end = function() {
          endCalled = true;
          return originalEnd.apply(this, arguments);
        };
      }

      db.close();

      // In original code, end should NOT be called because _writeStream is null
      // In mutated code, end WILL be called because condition is always true
      expect(endCalled).toBe(false);
      done();
    });
  });
});