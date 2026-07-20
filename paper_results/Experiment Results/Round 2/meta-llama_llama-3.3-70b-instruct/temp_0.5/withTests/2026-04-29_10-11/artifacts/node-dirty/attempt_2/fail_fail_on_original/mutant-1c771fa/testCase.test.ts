import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as assert from "assert";

describe('Dirty', () => {
  it('should emit an error when loading a corrupted row', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    db.on('load', () => {
      db.on('error', (err) => {
        assert.ok(err);
        assert.strictEqual(err.message, 'Could not load corrupted row: {"key":"x"');
        done();
      });
      fs.appendFileSync(filePath, '{"key":"x"');
      db._load();
    });
  });
});