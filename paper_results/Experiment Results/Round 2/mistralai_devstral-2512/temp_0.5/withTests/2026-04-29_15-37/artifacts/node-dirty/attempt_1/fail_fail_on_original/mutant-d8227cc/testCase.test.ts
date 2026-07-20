import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('test data chunk processing', () => {
  const testFile = path.join(__dirname, 'test-chunk.dirty');
  beforeEach(() => {
    rimraf.sync(testFile);
  });
  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should process data chunk without newline correctly', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      db.set('key1', 'value1');
      db.on('drain', () => {
        // Manually write a chunk without newline to simulate the scenario
        const writeStream = fs.createWriteStream(testFile, { flags: 'a', encoding: 'utf-8' });
        writeStream.write('{"key":"key2","val":"value2"}', () => {
          writeStream.end();
          // Reopen the database to trigger the load with the chunk without newline
          const db2 = new Dirty(testFile);
          db2.on('load', (size) => {
            // The original code should handle this correctly and not error
            // The mutated code will incorrectly treat this as having a newline and fail
            expect(size).toBe(2);
            done();
          });
        });
      });
    });
  });
});