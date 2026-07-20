import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { expect } from '@jest/globals';

describe('Dirty db', function () {
  it('should close correctly', function (done) {
    const db = new Dirty();
    db.on('load', () => {
      db.set('key', 'value', () => {
        db.close();
        db.on('write_close', () => {
          expect(db.listeners('drain').length).toBeGreaterThan(0);
          done();
        });
      });
    });
  });
});