import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', function () {
  it('should emit "drain" event with correct argument after write', function (done) {
    const db = new Dirty('test.dirty');
    db.set('key', 'value');
    db.on('drain', (arg) => {
      if (arg !== undefined) {
        throw new Error('Expected "drain" event to be emitted with no arguments');
      }
      db.close();
      done();
    });
  });
});