import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import iconv from 'iconv-lite';

describe('Dirty', () => {
  it('should write data to file with correct encoding', (done) => {
    const tmpDir = 'tmp-test-dir';
    const dbPath = path.join(tmpDir, 'test.db');
    try {
      fs.mkdirSync(tmpDir);
    } catch (err) {
      if (err.code === 'EEXIST') {
        fs.rmdirSync(tmpDir, { recursive: true });
        fs.mkdirSync(tmpDir);
      } else {
        throw err;
      }
    }

    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        fs.readFile(dbPath, (err, data) => {
          if (err) {
            done(err);
          } else {
            try {
              const utf8Data = iconv.decode(data, 'utf8');
              expect(utf8Data).toBe('{"key":"key","val":"value"}\n');
            } catch (e) {
              done(new Error('Failed to decode data as UTF-8'));
            }
            fs.rmdirSync(tmpDir, { recursive: true });
            done();
          }
        });
      });
    });
  });
});