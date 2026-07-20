import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from "rimraf";
import * as fs from "fs";
import * as path from "path";

describe('dirty db', function () {
  it('should throw error on empty lines', function (done) {
    const filePath = path.join(__dirname, 'tmp', 'emptyLine.dirty');
    const db = new Dirty(filePath);
    fs.writeFileSync(filePath, '\n{"key": "test", "val": "test"}\n');
    db.on('load', (length) => {
      db.on('error', (err) => {
        expect(err.message).toBe('Empty lines never appear in a healthy database');
        rimraf.sync(filePath);
        done();
      });
    });
  });
});