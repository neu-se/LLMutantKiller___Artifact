import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("dirty database row processing", () => {
  const testFile = path.join(__dirname, "test.dirty");
  const testData = '{"key":"test","val":"data"}\n';

  beforeAll(() => {
    fs.writeFileSync(testFile, testData);
  });

  afterAll(() => {
    fs.unlinkSync(testFile);
  });

  it("should return empty string from row processing to clear buffer", (done) => {
    const db = new Dirty(testFile);
    db.on("load", (size) => {
      expect(size).toBe(1);
      expect(db.get("test")).toBe("data");
      done();
    });
  });
});