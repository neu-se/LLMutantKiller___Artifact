import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database flush behavior', () => {
  it('should properly handle drain events during concurrent writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let drainCount = 0;
    let errorOccurred = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // After first drain, verify we can still write
          db.set('key2', { value: 2 }, (err) => {
            if (err) {
              errorOccurred = true;
              done(err);
            }
          });
        } else if (drainCount === 2) {
          // Verify both writes completed
          expect(db.get('key1')).toEqual({ value: 1 });
          expect(db.get('key2')).toEqual({ value: 2 });

          // Verify file contents
          const data = fs.readFileSync(dbPath, 'utf-8');
          const lines = data.trim().split('\n');
          expect(lines.length).toBe(2);

          db.close();
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        }
      });

      // First write that should trigger drain
      db.set('key1', { value: 1 }, (err) => {
        if (err) {
          errorOccurred = true;
          done(err);
        }
      });
    });

    db.on('error', (err) => {
      errorOccurred = true;
      db.close();
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      if (!errorOccurred) {
        db.close();
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done(new Error('Test timed out - drain event not received as expected'));
      }
    }, 1000);
  });
});