import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty read stream close event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit "read_close" event when read stream closes', (done) => {
    const dirty = new Dirty(dbPath);
    let readCloseEmitted = false;

    dirty.on('read_close', () => {
      readCloseEmitted = true;
    });

    dirty.on('load', () => {
      // Force close the read stream to test the event emission
      if (dirty._readStream) {
        dirty._readStream.destroy();
      }
    });

    // Wait a bit to ensure the event has time to fire
    setTimeout(() => {
      expect(readCloseEmitted).toBe(true);
      dirty.close();
      done();
    }, 100);
  });
});