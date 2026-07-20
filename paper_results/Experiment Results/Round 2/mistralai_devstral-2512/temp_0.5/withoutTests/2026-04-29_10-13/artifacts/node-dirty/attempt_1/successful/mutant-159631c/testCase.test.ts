import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database read stream close event', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit read_close event when read stream closes', (done) => {
    const db = new Dirty(dbPath);
    let loadEmitted = false;
    let readCloseEmitted = false;

    db.on('load', () => {
      loadEmitted = true;
      // Close the read stream manually to trigger the 'close' event
      if (db._readStream) {
        db._readStream.destroy();
      }
    });

    db.on('read_close', () => {
      readCloseEmitted = true;
      expect(loadEmitted).toBe(true);
      expect(readCloseEmitted).toBe(true);
      done();
    });

    // Force the load to complete by writing some data
    db.set('test', { value: 1 }, () => {});
  });
});