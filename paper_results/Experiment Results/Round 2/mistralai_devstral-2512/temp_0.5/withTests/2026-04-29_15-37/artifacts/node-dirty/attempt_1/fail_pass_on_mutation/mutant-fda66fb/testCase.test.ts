import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("test drain event behavior", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");
  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit drain event after all writes complete", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.on("drain", () => {
        expect(fs.existsSync(testFile)).toBe(true);
        const content = fs.readFileSync(testFile, "utf-8");
        const lines = content.trim().split("\n");
        expect(lines.length).toBe(2);
        done();
      });
    });
  });
});