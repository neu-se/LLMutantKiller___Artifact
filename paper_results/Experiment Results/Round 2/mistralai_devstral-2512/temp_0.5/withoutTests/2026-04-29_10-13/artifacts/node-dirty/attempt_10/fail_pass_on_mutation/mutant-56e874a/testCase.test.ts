import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
  });

  afterEach(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should not write when queue is empty and waitForDrain is false', (done) => {
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set a value
      db.set('test-key', { value: 'test' }, () => {
        // Immediately remove it (queue should be empty after this)
        db.rm('test-key');

        // Get initial file size
        const initialSize = fs.statSync(dbPath).size;

        // Force a flush attempt
        setImmediate(() => {
          // Get final file size
          const finalSize = fs.statSync(dbPath).size;

          // In original code, _flush should return early when queue is empty
          // so file size should not change
          // In mutated code, it will proceed and write, changing file size
          expect(finalSize).toBe(initialSize);
          done();
        });
      });
    });
  });
});