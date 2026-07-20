import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should only emit drain when there are no in-flight writes', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          expect(drainCount).toBe(1);
          db.set('key3', 'value3', () => {
            expect(drainCount).toBe(1);
          });
          db.on('drain', () => {
            expect(drainCount).toBe(2);
            fs.unlinkSync(file);
            done();
          });
        }
      });
    });
  });
});