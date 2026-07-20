import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', function () {
  it('should emit "drain" event after write', function (done) {
    const db = new Dirty('test.dirty');
    db.set('key', 'value');
    db.on('drain', () => {
      db.close();
      done();
    });
  });
});