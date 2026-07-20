import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('test data chunk processing with newline check', () => {
  const testFile = path.join(__dirname, 'test-chunk.dirty');

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

  it('should handle data chunks without newlines correctly', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      // Write a chunk without a newline to trigger the specific code path
      const writeStream = fs.createWriteStream(testFile, { flags: 'a', encoding: 'utf-8' });
      writeStream.write('{"key":"test","val":"data"}', () => {
        writeStream.end(() => {
          // Reopen to trigger the load with our test data
          const db2 = new Dirty(testFile);
          db2.on('load', () => {
            // If we reach here without error, the original code handled it correctly
            done();
          });
          db2.on('error', (err) => {
            // The mutated code will incorrectly process this and may cause an error
            done(err);
          });
        });
      });
    });
  });
});