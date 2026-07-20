import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty close', function () {
  it('should not call close twice when queue size is 0', function (done) {
    const db = new Dirty();
    let closeCount = 0;
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close = () => {
          closeCount++;
        };
        db.close();
        setTimeout(() => {
          expect(closeCount).toBe(1);
          done();
        }, 100);
      });
    });
  });
});