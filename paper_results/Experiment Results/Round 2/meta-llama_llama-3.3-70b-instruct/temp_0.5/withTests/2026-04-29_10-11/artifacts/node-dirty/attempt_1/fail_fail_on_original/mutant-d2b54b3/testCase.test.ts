import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import { rimraf } from "rimraf";

describe("Dirty db test", function () {
  it("should emit 'drain' event after write", function (done) {
    const filePath = path.join(__dirname, "test.dirty");
    rimraf.sync(filePath);

    const db = new Dirty(filePath);
    db.on("load", () => {
      db.set("key", "value");
      db.on("drain", () => {
        fs.unlinkSync(filePath);
        done();
      });
    });
  });
});