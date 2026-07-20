import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("dirty database file parsing", () => {
  const testFile = path.join(__dirname, "test.dirty");
  const validData = '{"key":"test","val":"data"}\n{"key":"another","val":"entry"}\n';

  beforeAll(() => {
    fs.writeFileSync(testFile, validData);
  });

  afterAll(() => {
    rimraf.sync(testFile);
  });

  it("should correctly parse and load valid database entries", (done) => {
    const db = new Dirty(testFile);
    db.on("load", (size) => {
      expect(size).toBe(2);
      expect(db.get("test")).toBe("data");
      expect(db.get("another")).toBe("entry");
      done();
    });
  });
});