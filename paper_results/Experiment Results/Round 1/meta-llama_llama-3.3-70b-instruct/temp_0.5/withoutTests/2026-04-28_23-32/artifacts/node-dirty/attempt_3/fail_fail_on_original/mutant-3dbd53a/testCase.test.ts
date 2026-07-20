import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

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
            const stats = fs.statSync(dbPath);
            expect(stats.size).toBeGreaterThan(0); // size should be greater than 0
            fs.rmdirSync(tmpDir, { recursive: true });
            done();
          }
        });
      });
    });
  });
});