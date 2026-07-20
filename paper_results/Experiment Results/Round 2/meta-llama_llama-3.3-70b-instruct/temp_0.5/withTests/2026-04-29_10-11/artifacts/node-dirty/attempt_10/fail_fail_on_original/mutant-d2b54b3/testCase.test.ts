import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("Dirty db test", function () {
  it("should emit 'drain' event after multiple writes and then close, with a check for 'drain' event after close", function (done) {
    const filePath = path.join(__dirname, "test.dirty");

    try {
      fs.unlinkSync(filePath);
    } catch (e) {
      if ((e as any).code!== 'ENOENT') {
        throw e;
      }
    }

    const db = new Dirty(filePath);
    db.on("load", () => {
      db.set("key1", "value1");
      db.set("key2", "value2");
      let drainCount = 0;
      db.on("drain", () => {
        drainCount++;
        if (drainCount === 1) {
          db.close();
          setTimeout(() => {
            if (drainCount === 1) {
              throw new Error("Drain event not emitted after close");
            }
            try {
              fs.unlinkSync(filePath);
            } catch (e) {
              if ((e as any).code!== 'ENOENT') {
                throw e;
              }
            }
            done();
          }, 100);
        }
      });
    });
  });
});