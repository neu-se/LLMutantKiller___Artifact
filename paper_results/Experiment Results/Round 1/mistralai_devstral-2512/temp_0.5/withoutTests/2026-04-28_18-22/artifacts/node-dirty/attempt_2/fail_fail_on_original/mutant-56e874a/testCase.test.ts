import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database flush behavior', () => {
  it('should flush pending writes when queue has items', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Add multiple items to the queue
      dirty.set('key1', 'value1', () => {});
      dirty.set('key2', 'value2', () => {});
      dirty.set('key3', 'value3', () => {});

      // Verify queue has items
      expect(dirty._queue.size).toBeGreaterThan(0);

      // Force flush
      dirty._flush();

      // Check that items were written
      setImmediate(() => {
        const content = fs.readFileSync(dbPath, 'utf-8');
        const lines = content.trim().split('\n');
        expect(lines.length).toBe(3);

        dirty.close();
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      });
    });
  });
});