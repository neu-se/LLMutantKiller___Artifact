import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database chunk processing', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('should correctly handle chunks without newlines', (done) => {
    const dirty = new Dirty(dbPath);
    let loadCount = 0;

    dirty.on('load', (size) => {
      loadCount++;
      if (loadCount === 1) {
        // Write data without newline to trigger the chunk processing
        fs.writeFileSync(dbPath, '{"key":"test","val":42}', 'utf-8');
        dirty._readStream?.destroy();
        dirty._readStream = null;
        dirty._load();
      }
    });

    dirty.on('error', (err) => {
      // The original code should not emit an error for this case
      // The mutated code will incorrectly process the chunk
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