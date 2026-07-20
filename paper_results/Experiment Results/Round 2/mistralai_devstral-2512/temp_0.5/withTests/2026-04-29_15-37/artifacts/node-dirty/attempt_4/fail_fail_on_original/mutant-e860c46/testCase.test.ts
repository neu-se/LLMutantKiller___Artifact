import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method with pending queue', () => {
  const testFile = path.join(__dirname, 'test-close-queue.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should delay close when queue has pending operations', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Add operations to queue without callbacks to create pending state
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Verify queue is not empty before close
      const queueSizeBefore = (db as any)._queue.size;
      expect(queueSizeBefore).toBeGreaterThan(0);

      // Call close while queue has pending operations
      db.close();

      // Verify close is delayed until queue is processed
      db.on('write_close', () => {
        // Verify queue is now empty
        const queueSizeAfter = (db as any)._queue.size;
        expect(queueSizeAfter).toBe(0);

        // Verify file was written
        const content = fs.readFileSync(testFile, 'utf-8');
        expect(content).toContain('key1');
        expect(content).toContain('key2');
        done();
      });
    });
  });
});