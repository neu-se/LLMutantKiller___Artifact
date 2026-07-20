import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with in-flight writes', () => {
  it('should properly handle close when there are in-flight writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Set a value without callback to create an in-flight write
      dirty.set('testKey', { value: 'testValue' });

      // Immediately close - should wait for drain
      dirty.close();

      // Verify that the write stream is still active initially
      expect(dirty._writeStream).not.toBeNull();

      // After drain event, streams should be closed
      dirty.on('drain', () => {
        expect(dirty._writeStream).toBeNull();
        expect(dirty._readStream).toBeNull();

        // Clean up
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      });
    });

    dirty.on('error', (err: Error) => {
      // Clean up on error
      try { fs.unlinkSync(dbPath); } catch {}
      try { fs.rmdirSync(testDir); } catch {}
      done(err);
    });
  });
});