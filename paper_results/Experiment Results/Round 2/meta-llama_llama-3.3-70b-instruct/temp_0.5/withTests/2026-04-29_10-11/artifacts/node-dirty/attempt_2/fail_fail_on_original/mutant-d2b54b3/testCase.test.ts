import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("Dirty db test", function () {
  it("should emit 'drain' event after write", function (done) {
    const filePath = path.join(__dirname, "test.dirty");
    fs.unlinkSync(filePath);

    const db = new Dirty(filePath);
    db.on("load", () => {
      db.set("key", "value");
      db.on("drain", () => {
        db.close();
        fs.unlinkSync(filePath);
        done();
      });
    });
  });
});