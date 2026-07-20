import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should handle _flush correctly', (done) => {
    const tempDir = './temp';
    const filePath = path.join(tempDir, 'test.db');

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const dirty = new Dirty(filePath);
    let errorEmitted = false;
    dirty.on('load', () => {
      dirty.set('key1', 'value1', () => {
        dirty.set('key2', 'value2', () => {
          dirty._waitForDrain = true;
          dirty.set('key3', 'value3', () => {
            dirty.once('drain', () => {
              expect(dirty.size()).toBe(3);
              expect(errorEmitted).toBe(false);
              dirty.close();
              done();
            });
          });
        });
      });
    });
    dirty.on('error', (err) => {
      errorEmitted = true;
    });
  });
});