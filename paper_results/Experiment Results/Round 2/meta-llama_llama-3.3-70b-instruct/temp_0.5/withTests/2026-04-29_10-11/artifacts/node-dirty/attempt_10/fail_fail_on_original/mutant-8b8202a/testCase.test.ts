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
      });
      db.set('key3', 'value3', () => {
        db.set('key4', 'value4', () => {
          db.close();
          setTimeout(() => {
            expect(drainCount).toBe(1);
            fs.unlinkSync(file);
            done();
          }, 10);
        });
      });
    });
  });
});