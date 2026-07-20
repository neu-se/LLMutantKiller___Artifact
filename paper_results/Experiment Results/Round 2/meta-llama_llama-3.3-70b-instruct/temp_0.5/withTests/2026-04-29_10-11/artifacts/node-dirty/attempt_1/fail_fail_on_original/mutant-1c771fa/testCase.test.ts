import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { fs } from "fs";
import { assert } from "assert";

describe('Dirty', () => {
  it('should emit an error when loading a corrupted row', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    db.on('load', () => {
      db.on('error', (err) => {
        assert.ok(err);
        done();
      });
      fs.appendFileSync(filePath, '{"key":"x"}'); // corrupted row
      db._load();
    });
  });
});