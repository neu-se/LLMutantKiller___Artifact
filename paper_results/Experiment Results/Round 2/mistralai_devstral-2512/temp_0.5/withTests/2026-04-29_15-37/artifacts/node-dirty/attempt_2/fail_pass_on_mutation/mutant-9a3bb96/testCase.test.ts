import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close behavior with pending operations', () => {
  const testFile = path.join(__dirname, 'tmp', 'close-test.dirty');
  const tmpDir = path.join(__dirname, 'tmp');

  beforeAll(() => {
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
  });

  afterAll(() => {
    rimraf.sync(tmpDir);
  });

  it('should immediately close when there are no pending operations', (done) => {
    const db = new Dirty(testFile);
    let closeFired = false;

    db.on('load', () => {
      // Close immediately without any pending operations
      db.close();
    });

    db.on('write_close', () => {
      closeFired = true;
      done();
    });

    // Set a timeout to fail the test if close doesn't happen immediately
    setTimeout(() => {
      if (!closeFired) {
        fail('Close should have been called immediately');
      }
    }, 100);
  });
});