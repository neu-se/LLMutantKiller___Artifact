import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as assert from "assert";

describe('Dirty', () => {
  it('should emit an error when loading a corrupted row', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    let errorEmitted = false;
    db.on('error', (err) => {
      if (err.message.includes('Could not load corrupted row')) {
        errorEmitted = true;
      }
    });
    fs.writeFileSync(filePath, '{"key":"x"}');
    db.close();
    const db2 = new Dirty(filePath);
    db2.on('load', () => {
      if (errorEmitted) {
        assert.ok(true);
      } else {
        assert.ok(false, 'Error should have been emitted');
      }
      done();
    });
    db2.on('error', (err) => {
      if (err.message.includes('Corrupted row at the end of the db')) {
        assert.ok(true);
        done();
      }
    });
  });
});