import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fs } from 'fs';

describe('dirty db', function () {
  it('should not emit drain when there are in-flight writes', async function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    let drainCount = 0;
    db.on('load', () => {
      db.set('key', 'value', () => {
        db.set('key2', 'value2');
      });
    });
    db.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        db.set('key3', 'value3');
      }
      if (drainCount === 2) {
        expect(drainCount).toBe(2);
        fs.unlink(file).then(() => done());
      }
    });
  });
});