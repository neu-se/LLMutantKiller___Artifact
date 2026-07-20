import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close method', () => {
  const testDir = path.join(__dirname, 'test-dirty-close');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should properly destroy write stream when closed', (done) => {
    const dirty = new Dirty(dbPath);
    let writeStreamDestroyed = false;

    dirty.on('read_close', () => {
      dirty.set('test', { value: 'data' }, () => {
        // Override the destroy method to track when it's called
        const originalDestroy = dirty._writeStream?.destroy;
        if (originalDestroy) {
          dirty._writeStream.destroy = function(...args) {
            writeStreamDestroyed = true;
            return originalDestroy.apply(this, args);
          };
        }

        dirty.close();

        setImmediate(() => {
          expect(writeStreamDestroyed).toBe(true);
          done();
        });
      });
    });
  });
});