import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty close', function () {
  it('should not throw an error when close is called with drain event', function (done) {
    const db = new Dirty();
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.once('drain', () => {
          throw new Error("Event listener should not be triggered");
        });
        setTimeout(() => {
          done();
        }, 100);
      });
    });
  });
});