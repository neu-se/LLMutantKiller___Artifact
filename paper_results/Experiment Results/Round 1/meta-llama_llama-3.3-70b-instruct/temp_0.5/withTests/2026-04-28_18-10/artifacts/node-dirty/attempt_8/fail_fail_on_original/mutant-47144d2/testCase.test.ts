import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe('dirty db', function () {
  it('should throw error when loading data with empty line', function (done) {
    const filePath = path.join(__dirname, 'tmp', 'emptyLine.dirty');
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const db = new Dirty(filePath);
    fs.writeFileSync(filePath, '\n{"key": "test", "val": "test"}\n');
    let errorTriggered = false;
    db.on('load', (length) => {
      if (!errorTriggered) {
        expect(true).toBe(false); // This should not be reached
      }
      fs.unlinkSync(filePath);
      done();
    });
    db.on('error', (err) => {
      errorTriggered = true;
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      fs.unlinkSync(filePath);
      done();
    });
  });
});