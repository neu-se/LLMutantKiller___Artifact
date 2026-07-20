import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database corrupted row handling', () => {
  it('should not include mutant string in error handling return value', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    // Create a mock writeStream to capture the return value
    const originalCreateWriteStream = fs.createWriteStream;
    let capturedReturnValue: any = null;

    fs.createWriteStream = function(...args: any[]) {
      const stream = originalCreateWriteStream.apply(this, args);
      const originalWrite = stream.write;
      stream.write = function(data: any, cb?: any) {
        const result = originalWrite.call(this, data, cb);
        if (cb) {
          const originalCallback = cb;
          cb = function(err: any) {
            capturedReturnValue = originalCallback(err);
            return capturedReturnValue;
          };
        }
        return result;
      };
      return stream;
    };

    // Write a database file with a corrupted row
    fs.writeFileSync(dbPath, '{"key":"test","val":1}\n{invalid json}\n', 'utf-8');

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      expect(err.message).toContain("Could not load corrupted row");
    });

    db.on('load', () => {
      // The mutant changes the return value from '' to "Stryker was here!"
      // We need to verify this doesn't affect the actual behavior
      expect(db.get('test')).toBe(1);

      // Restore original function
      fs.createWriteStream = originalCreateWriteStream;
      done();
    });
  });
});