import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

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
        fs.open(dbPath, 'r', (err, fd) => {
          if (err) {
            done(err);
          } else {
            const buffer = Buffer.alloc(1024);
            fs.read(fd, buffer, 0, 1024, 0, (err, bytesRead) => {
              if (err) {
                done(err);
              } else {
                const string = buffer.slice(0, bytesRead).toString();
                expect(string.charCodeAt(0)).toBe(123); // ASCII code for '{'
                expect(string.charCodeAt(1)).toBe(34); // ASCII code for '"'
                fs.closeSync(fd);
                fs.rmdirSync(tmpDir, { recursive: true });
                done();
              }
            });
          }
        });
      });
    });
  });
});