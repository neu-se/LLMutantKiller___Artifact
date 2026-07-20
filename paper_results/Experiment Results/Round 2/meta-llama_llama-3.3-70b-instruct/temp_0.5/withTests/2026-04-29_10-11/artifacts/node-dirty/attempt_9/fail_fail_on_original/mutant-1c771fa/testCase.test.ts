import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as assert from "assert";

describe('Dirty', () => {
  it('should emit error message when loading corrupted row', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    let errorEmitted = false;
    db.on('error', (err) => {
      if (err.message.includes('Could not load corrupted row')) {
        errorEmitted = true;
      }
    });
    fs.writeFileSync(filePath, '{"key":"x"}');
    db.on('load', () => {
      assert.ok(errorEmitted);
      done();
    });
  });
});