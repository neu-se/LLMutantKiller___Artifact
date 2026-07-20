import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Dirty database drain event', () => {
  const testDbPath = path.join(__dirname, 'test-db-mutant-2b60afb');
  let dirty: Dirty;

  beforeEach(() => {
    dirty = new Dirty(testDbPath);
  });

  afterEach(() => {
    dirty.close();
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  it('should emit drain event when all writes complete', (done) => {
    const testData = {
      key1: { value: 'test1' },
      key2: { value: 'test2' },
      key3: { value: 'test3' }
    };

    let drainCount = 0;
    dirty.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        // First drain should occur after initial writes
        expect(dirty.get('key1')).toEqual(testData.key1);
        expect(dirty.get('key2')).toEqual(testData.key2);
        expect(dirty.get('key3')).toEqual(testData.key3);

        // Add more data to trigger another flush
        dirty.set('key4', { value: 'test4' }, () => {
          // This callback should be called before the next drain
        });
      } else if (drainCount === 2) {
        // Second drain should occur after the additional write
        expect(dirty.get('key4')).toEqual({ value: 'test4' });
        done();
      }
    });

    // Set multiple values to trigger flush
    dirty.set('key1', testData.key1);
    dirty.set('key2', testData.key2);
    dirty.set('key3', testData.key3);
  });
});