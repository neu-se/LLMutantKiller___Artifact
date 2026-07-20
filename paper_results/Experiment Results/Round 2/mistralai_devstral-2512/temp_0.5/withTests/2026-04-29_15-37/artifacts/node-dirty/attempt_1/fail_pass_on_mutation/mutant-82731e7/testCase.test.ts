import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method behavior', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should not destroy writeStream when no writes are pending', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Verify writeStream exists before close
      expect(db._writeStream).not.toBeNull();

      // Spy on destroy to verify it's not called
      const destroySpy = jest.spyOn(db._writeStream, 'destroy');

      db.close();

      // In original code, destroy should NOT be called because _writeStream is null
      // In mutated code, destroy WILL be called because condition is always true
      expect(destroySpy).not.toHaveBeenCalled();
      done();
    });
  });
});