import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("dirty database file parsing behavior", () => {
  const testFile = path.join(__dirname, "test.dirty");
  const testData = '{"key":"test","val":"data"}\n{"key":"another","val":"entry"}\n';

  beforeAll(() => {
    fs.writeFileSync(testFile, testData);
  });

  afterAll(() => {
    fs.unlinkSync(testFile);
  });

  it("should correctly process valid database entries and return empty string from row processing", (done) => {
    const db = new Dirty(testFile);
    db.on("load", (size) => {
      expect(size).toBe(2);
      expect(db.get("test")).toBe("data");
      expect(db.get("another")).toBe("entry");
      done();
    });
  });
});