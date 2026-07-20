// testCase.test.ts
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("drain event emission", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit drain event after write stream drains", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      db.on("drain", () => {
        // Verify that the drain event was emitted after all writes completed
        expect(db.get("key1")).toBe("value1");
        expect(db.get("key2")).toBe("value2");
        expect(db.get("key3")).toBe("value3");
        done();
      });
    });
  });
});