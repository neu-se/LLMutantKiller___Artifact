import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database flush behavior', () => {
  it('should handle multiple concurrent writes correctly', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set up initial data
      db.set('key1', { value: 1 }, () => {
        // Queue multiple writes to the same key
        db.set('key1', { value: 2 }, (err) => {
          if (err) done(err);
        });
        db.set('key1', { value: 3 }, (err) => {
          if (err) done(err);
        });
        db.set('key1', { value: 4 }, (err) => {
          if (err) done(err);
        });

        // Set a timeout to check the final state
        setTimeout(() => {
          const finalValue = db.get('key1');
          expect(finalValue).toEqual({ value: 4 });

          // Verify the file contains the correct data
          const data = fs.readFileSync(dbPath, 'utf-8');
          const lines = data.trim().split('\n');
          const lastLine = lines[lines.length - 1];
          const lastEntry = JSON.parse(lastLine);
          expect(lastEntry.val).toEqual({ value: 4 });

          db.close();
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        }, 100);
      });
    });

    db.on('error', (err) => {
      db.close();
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  });
});