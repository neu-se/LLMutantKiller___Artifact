import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty close method', () => {
  const testDir = path.join(__dirname, 'test-dirty-close');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should properly destroy write stream when closed', (done) => {
    const dirty = new Dirty(dbPath);
    let writeCloseCount = 0;
    let drainCount = 0;

    dirty.on('write_close', () => {
      writeCloseCount++;
    });

    dirty.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        dirty.close();
      }
    });

    dirty.on('read_close', () => {
      // Ensure the write stream is destroyed after close
      setImmediate(() => {
        expect(writeCloseCount).toBe(1);
        done();
      });
    });

    dirty.set('test', { value: 'data' }, () => {});
  });
});