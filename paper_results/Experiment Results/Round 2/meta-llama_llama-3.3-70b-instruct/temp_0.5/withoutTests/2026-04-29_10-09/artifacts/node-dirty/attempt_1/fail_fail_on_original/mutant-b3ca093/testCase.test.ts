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
        dirty.set('key2', 'value2', () => {
          dirty.once('drain', () => {
            dirty._waitForDrain = true;
            dirty._flush();
            dirty.once('drain', () => {
              const data = fs.readFileSync(filePath, 'utf8');
              expect(data).toContain('{"key":"key1","val":"value1"}');
              expect(data).toContain('{"key":"key2","val":"value2"}');
              done();
            });
          });
        });
      });
    });
  });
});