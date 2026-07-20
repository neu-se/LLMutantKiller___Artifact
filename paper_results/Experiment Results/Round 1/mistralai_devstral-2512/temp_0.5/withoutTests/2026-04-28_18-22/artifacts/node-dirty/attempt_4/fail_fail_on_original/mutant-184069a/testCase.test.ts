import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database ENOENT handling', () => {
  it('should emit load event for ENOENT but error for other errors', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const nonExistentFile = path.join(testDir, 'nonexistent.db');
    const permissionDeniedFile = path.join(testDir, 'permission.db');

    // Setup test directory
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    // Create a file with no read permissions to trigger non-ENOENT error
    fs.writeFileSync(permissionDeniedFile, '{}');
    fs.chmodSync(permissionDeniedFile, 0o000);

    const db1 = new Dirty(nonExistentFile);
    const db2 = new Dirty(permissionDeniedFile);

    let loadCount = 0;
    let errorCount = 0;

    db1.on('load', (size) => {
      expect(size).toBe(0);
      loadCount++;
      if (loadCount + errorCount === 2) {
        expect(loadCount).toBe(1);
        expect(errorCount).toBe(1);
        db1.close();
        db2.close();
        rimraf.sync(testDir);
        done();
      }
    });

    db2.on('error', (err) => {
      expect(err.code).not.toBe('ENOENT');
      errorCount++;
      if (loadCount + errorCount === 2) {
        expect(loadCount).toBe(1);
        expect(errorCount).toBe(1);
        db1.close();
        db2.close();
        rimraf.sync(testDir);
        done();
      }
    });

    db1.on('error', (err) => {
      db1.close();
      db2.close();
      rimraf.sync(testDir);
      done(new Error('Should not emit error for ENOENT'));
    });

    db2.on('load', () => {
      db1.close();
      db2.close();
      rimraf.sync(testDir);
      done(new Error('Should not emit load for permission error'));
    });
  });
});