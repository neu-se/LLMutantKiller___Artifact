import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty close method stream destruction', () => {
  it('should properly destroy the write stream when closing', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up and create test directory
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);

    db.on('load', () => {
      db.set('key1', { data: 'value1' }, () => {
        // Check if write stream exists before closing
        const hasWriteStreamBefore = db._writeStream !== null;
        db.close();

        // Check if write stream is properly destroyed after closing
        setTimeout(() => {
          const hasWriteStreamAfter = db._writeStream !== null;

          if (!hasWriteStreamBefore) {
            done(new Error('Write stream should exist before closing'));
          } else if (hasWriteStreamAfter) {
            done(new Error('Write stream should be destroyed after closing'));
          } else {
            done();
          }
        }, 100);
      });
    });

    // Set a timeout to fail the test if it takes too long
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 500);
  });
});