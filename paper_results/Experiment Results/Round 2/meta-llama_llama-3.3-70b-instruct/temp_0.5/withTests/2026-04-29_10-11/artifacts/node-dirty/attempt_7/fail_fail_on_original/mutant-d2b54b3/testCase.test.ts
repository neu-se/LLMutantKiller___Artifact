import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("Dirty db test", function () {
  it("should emit 'drain' event after multiple writes and then close, with a check for 'drain' event after close", function (done) {
    const filePath = path.join(__dirname, "test.dirty");

    try {
      fs.unlinkSync(filePath);
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }

    const db = new Dirty(filePath);
    db.on("load", () => {
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.on("drain", () => {
        db.close();
        db.on("write_close", () => {
          db.set("key3", "value3");
          let called = false;
          db.on("drain", () => {
            called = true;
          });
          setTimeout(() => {
            if (!called) {
              throw new Error("Drain event not emitted after close and set");
            }
            try {
              fs.unlinkSync(filePath);
            } catch (e) {
              if (e.code !== 'ENOENT') {
                throw e;
              }
            }
            done();
          }, 100);
        });
      });
    });
  });
});