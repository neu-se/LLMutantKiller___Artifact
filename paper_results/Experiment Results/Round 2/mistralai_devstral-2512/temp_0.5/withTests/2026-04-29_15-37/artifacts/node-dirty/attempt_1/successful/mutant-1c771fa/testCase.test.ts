import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('dirty database error handling', () => {
  const testFile = path.join(__dirname, 'test-corrupted.dirty');
  let db: any;

  afterAll(() => {
    rimraf.sync(testFile);
  });

  it('should emit error event when encountering corrupted data', (done) => {
    // Create a file with corrupted JSON data
    fs.writeFileSync(testFile, '{"key":"valid","val":"data"}\ncorrupted data\n{"key":"another","val":"entry"}\n');

    db = new Dirty(testFile);
    db.on('error', (err: Error) => {
      expect(err.message).toContain('Could not load corrupted row');
      done();
    });
  });
});