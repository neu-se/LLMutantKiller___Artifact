import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty close behavior', () => {
  it('should close the db file streams after drain event', (done) => {
    const db = new Dirty();
    let loadCalled = false;
    db.on('load', () => {
      loadCalled = true;
    });
    db.on('write_close', () => {
      if (loadCalled) {
        done();
      } else {
        throw new Error('Expected load event to be called before write_close');
      }
    });
    db.close();
  });
});