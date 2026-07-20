import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit drain event when all writes are completed', (done) => {
    const dbPath = path.join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);
    dirty.on('drain', () => {
      fs.stat(dbPath, (err, stats) => {
        if (err) {
          done(err);
        } else {
          expect(stats.size).toBeGreaterThan(0);
          rimraf.sync(dbPath);
          done();
        }
      });
    });
    dirty.set('key', 'value');
  });
});