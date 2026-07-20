import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("test-flush-behavior", () => {
  const testFile = path.join(__dirname, "test-flush.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should flush pending writes when _flush is called", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.on("drain", () => {
        const contents = fs.readFileSync(testFile, "utf-8");
        const lines = contents.trim().split("\n");
        expect(lines.length).toBe(2);
        expect(lines[0]).toBe(JSON.stringify({ key: "key1", val: "value1" }));
        expect(lines[1]).toBe(JSON.stringify({ key: "key2", val: "value2" }));
        done();
      });
    });
  });
});