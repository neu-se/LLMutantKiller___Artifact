import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database flush behavior', () => {
  it('should not flush when queue is empty', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Clear the queue
      dirty._queue.clear();

      // Get initial file content
      const initialContent = fs.readFileSync(dbPath, 'utf-8');

      // Force flush - should not write anything
      dirty._flush();

      setImmediate(() => {
        // Verify content hasn't changed
        const finalContent = fs.readFileSync(dbPath, 'utf-8');
        expect(finalContent).toBe(initialContent);

        dirty.close();
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      });
    });
  });
});