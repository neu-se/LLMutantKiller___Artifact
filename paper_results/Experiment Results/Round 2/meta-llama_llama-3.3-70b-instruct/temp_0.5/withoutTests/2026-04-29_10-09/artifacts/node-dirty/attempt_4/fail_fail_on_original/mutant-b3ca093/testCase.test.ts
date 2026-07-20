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
    dirty.on('load', () => {
      dirty.set('key1', 'value1', () => {
        dirty._waitForDrain = true;
        dirty.set('key2', 'value2', () => {
          dirty.once('drain', () => {
            expect(dirty.size()).toBe(2);
            dirty.close();
            done();
          });
        });
      });
    });
  });
});