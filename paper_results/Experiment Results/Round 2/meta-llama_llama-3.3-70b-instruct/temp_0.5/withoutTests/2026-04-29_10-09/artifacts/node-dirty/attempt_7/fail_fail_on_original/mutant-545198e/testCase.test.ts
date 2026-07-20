import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should handle chunks without newlines correctly', (done) => {
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'test.db');
    fs.mkdirSync(tempDir);
    const dirty = new Dirty(filePath);
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.set('key2', 'value2', () => {
          const chunk = 'key:"key","val":"value"';
          dirty._readStream = fs.createReadStream(filePath, { encoding: 'utf-8', flags: 'r' });
          dirty._readStream.emit('data', chunk);
          dirty.on('error', (err) => {
            expect(err.message).toBe('Empty lines never appear in a healthy database');
            fs.rmdirSync(tempDir, { recursive: true });
            done();
          });
        });
      });
    });
  });
});