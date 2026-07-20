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
          fs.appendFileSync(filePath, 'partialData');
          const readStream = fs.createReadStream(filePath, { encoding: 'utf-8', flags: 'r' });
          let data = '';
          readStream.on('data', (c) => {
            data += c;
          });
          readStream.on('end', () => {
            expect(data).toContain('partialData');
            expect(data).not.toContain('partialData\n');
            fs.rmdirSync(tempDir, { recursive: true });
            done();
          });
        });
      });
    });
  });
});