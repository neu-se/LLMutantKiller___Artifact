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

  it('should process all queued items in a single flush when buffer is available', (done) => {
    const db = new Dirty(dbPath);
    let writeCount = 0;

    db.on('load', () => {
      // Track write operations
      const originalWrite = db._writeStream!.write.bind(db._writeStream!);
      db._writeStream!.write = function(data: any, cb?: (error: Error | null | undefined) => void): boolean {
        writeCount++;
        return originalWrite(data, cb);
      };

      // Queue multiple items
      db.set('key1', { value: 1 }, () => {});
      db.set('key2', { value: 2 }, () => {});
      db.set('key3', { value: 3 }, () => {});

      // Force flush
      db._flush();

      // Verify all items were written
      setTimeout(() => {
        expect(writeCount).toBe(3);
        expect(db.size()).toBe(3);
        done();
      }, 100);
    });
  });
});