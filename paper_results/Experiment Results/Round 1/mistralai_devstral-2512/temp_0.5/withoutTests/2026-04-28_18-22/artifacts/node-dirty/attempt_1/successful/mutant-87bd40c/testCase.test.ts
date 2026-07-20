import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty close method', () => {
  it('should destroy the read stream when close is called', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    fs.mkdirSync(testDir, { recursive: true });
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const originalDestroy = db._readStream.destroy;
      let destroyCalled = false;

      db._readStream.destroy = function(...args) {
        destroyCalled = true;
        return originalDestroy.apply(this, args);
      };

      db.close();

      setImmediate(() => {
        expect(destroyCalled).toBe(true);
        rimraf.sync(testDir);
        done();
      });
    });

    db.on('error', (err) => {
      rimraf.sync(testDir);
      done(err);
    });
  });
});