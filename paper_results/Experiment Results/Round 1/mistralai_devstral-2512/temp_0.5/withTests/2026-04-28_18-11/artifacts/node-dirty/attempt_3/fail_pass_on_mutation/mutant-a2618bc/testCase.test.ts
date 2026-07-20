import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant test for _flush break condition', () => {
  const testFile = path.join(__dirname, 'test-flush-mutant.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should break flush loop when waitForDrain is true', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      const largeValue = 'x'.repeat(100000);
      const keys = ['key1', 'key2', 'key3'];
      let setCount = 0;

      db.set(keys[0], largeValue, (err) => {
        if (err) return done(err);

        db.set(keys[1], largeValue);
        db.set(keys[2], largeValue);

        setTimeout(() => {
          const content = fs.readFileSync(testFile, 'utf-8');
          const lines = content.trim().split('\n');
          if (lines.length !== 3) {
            done(new Error(`Expected 3 lines but got ${lines.length}`));
          } else {
            done();
          }
        }, 100);
      });
    });
  });
});