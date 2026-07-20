import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should write data to file with correct encoding', (done) => {
    const tmpDir = 'tmp-test-dir';
    const dbPath = path.join(tmpDir, 'test.db');
    fs.mkdirSync(tmpDir);

    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
          if (err) {
            done(err);
          } else {
            expect(data).toBe('{"key":"key","val":"value"}\n');
            rimraf.sync(tmpDir);
            done();
          }
        });
      });
    });
  });
});