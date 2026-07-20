import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close method stream destruction', () => {
  it('should properly destroy the write stream when closing', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up and create test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);

    db.on('load', () => {
      db.set('key1', { data: 'value1' }, () => {
        db.close();
      });
    });

    db.on('write_close', () => {
      // Verify the write stream is properly destroyed
      if (db._writeStream !== null) {
        done(new Error('Write stream should be null after write_close event'));
      } else {
        done();
      }
    });

    // Set a timeout to fail the test if it takes too long
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 500);
  });
});