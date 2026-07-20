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
        // Track if destroy was called on the write stream
        const originalDestroy = dirty._writeStream?.destroy;
        if (originalDestroy) {
          dirty._writeStream.destroy = function(...args) {
            writeStreamDestroyed = true;
            return originalDestroy.apply(this, args);
          };
        }

        // Override end to track callback execution
        const originalEnd = dirty._writeStream?.end;
        if (originalEnd) {
          dirty._writeStream.end = function(callback) {
            if (callback) {
              return originalEnd.call(this, () => {
                // In original code, destroy should be called here
                // In mutated code, it won't be called
                setTimeout(() => {
                  expect(writeStreamDestroyed).toBe(true);
                  done();
                }, 10);
              });
            }
            return originalEnd.call(this, callback);
          };
        }

        dirty.close();
      });
    });
  });
});