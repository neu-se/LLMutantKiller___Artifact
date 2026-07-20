import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should not close immediately when there are pending writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set up a write that will be pending
      db.set('test', 'value', () => {
        // This callback should execute before close completes
        expect(fs.existsSync(testFile)).toBe(true);

        // Verify the write stream is still open
        expect((db as any)._writeStream).not.toBeNull();

        // Now close should proceed since the write completed
        db.close();
      });

      // The close should be delayed until the write completes
      db.on('write_close', () => {
        done();
      });

      // Call close immediately after set (before the write completes)
      db.close();
    });
  });
});