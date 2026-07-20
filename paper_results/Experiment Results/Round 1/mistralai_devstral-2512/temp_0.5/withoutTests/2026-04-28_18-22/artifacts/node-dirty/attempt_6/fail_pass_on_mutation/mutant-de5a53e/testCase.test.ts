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
    let writeStreamEndCalled = false;
    let writeStreamDestroyCalled = false;

    dirty.on('read_close', () => {
      dirty.set('test', { value: 'data' }, () => {
        // Track both end and destroy calls
        const originalEnd = dirty._writeStream?.end;
        const originalDestroy = dirty._writeStream?.destroy;

        if (originalEnd && originalDestroy) {
          dirty._writeStream.end = function(callback) {
            writeStreamEndCalled = true;
            return originalEnd.call(this, () => {
              // In the original code, destroy should be called here
              // In the mutated code, it won't be called
              setTimeout(() => {
                expect(writeStreamDestroyCalled).toBe(true);
                done();
              }, 50);
            });
          };

          dirty._writeStream.destroy = function() {
            writeStreamDestroyCalled = true;
            return originalDestroy.apply(this, arguments);
          };
        }

        dirty.close();
      });
    });
  });
});