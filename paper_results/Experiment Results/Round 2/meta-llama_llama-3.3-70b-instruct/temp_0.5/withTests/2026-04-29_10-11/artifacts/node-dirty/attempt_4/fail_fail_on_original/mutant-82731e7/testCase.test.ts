import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as assert from 'assert';

describe('Dirty', () => {
  it('should close write stream only when it exists', (done) => {
    const db = new Dirty();
    db.on('load', () => {
      db.close();
      db.on('write_close', () => {
        assert.strictEqual(db._writeStream, null);
        done();
      });
    });
  });
});