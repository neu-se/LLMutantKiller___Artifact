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
    let writeStreamEndCallbackCalled = false;

    dirty.on('read_close', () => {
      dirty.set('test', { value: 'data' }, () => {
        // Override the end method to track callback execution
        const originalEnd = dirty._writeStream?.end;
        if (originalEnd) {
          dirty._writeStream.end = function(callback) {
            if (callback) {
              const originalCallback = callback;
              dirty._writeStream.end = originalEnd;
              return originalEnd.call(this, () => {
                writeStreamEndCallbackCalled = true;
                originalCallback();
              });
            }
            return originalEnd.call(this, callback);
          };
        }

        dirty.close();

        setImmediate(() => {
          expect(writeStreamEndCallbackCalled).toBe(true);
          done();
        });
      });
    });
  });
});