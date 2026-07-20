import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should handle chunks without newlines correctly', (done) => {
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'test.db');
    fs.mkdirSync(tempDir);
    const dirty = new Dirty(filePath);
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        const chunk = 'key:"key","val":"value"';
        const readStream = fs.createReadStream(filePath, { encoding: 'utf-8', flags: 'r' });
        let data = '';
        readStream.on('data', (c) => {
          data += c;
        });
        readStream.on('end', () => {
          expect(data).toBe(chunk + '\n');
          rimraf.sync(tempDir);
          done();
        });
      });
    });
  });
});