import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as assert from "assert";

describe('Dirty', () => {
  it('should not load corrupted row', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    fs.writeFileSync(filePath, '{"key":"x"}');
    db.on('load', () => {
      assert.strictEqual(db.size(), 0);
      done();
    });
  });
});