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
          const readStream = fs.createReadStream(filePath, { encoding: 'utf-8', flags: 'r' });
          let data = '';
          readStream.on('data', (c) => {
            data += c;
          });
          readStream.on('end', () => {
            expect(data).toContain('key:"key"');
            expect(data).toContain('key:"key2"');
            expect(data).toContain('\n');
            fs.rmdirSync(tempDir, { recursive: true });
            done();
          });
        });
      });
    });
  });
});