import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database chunk processing', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should correctly process chunks without newlines', (done) => {
    const dirty = new Dirty(dbPath);
    let loadCount = 0;

    dirty.on('load', (size) => {
      loadCount++;
      // After initial load (size=0), write data without newline
      if (loadCount === 1) {
        fs.writeFileSync(dbPath, '{"key":"test","val":42}', 'utf-8');
        dirty._readStream.destroy();
        dirty._readStream = null;
        dirty._load();
      }
    });

    dirty.on('error', (err) => {
      // Should not emit error for chunk without newline
      expect(err).toBeUndefined();
      done();
    });

    dirty.on('load', (size) => {
      if (loadCount === 2) {
        // Should have loaded the data after second load
        expect(dirty.get('test')).toBe(42);
        done();
      }
    });
  });
});