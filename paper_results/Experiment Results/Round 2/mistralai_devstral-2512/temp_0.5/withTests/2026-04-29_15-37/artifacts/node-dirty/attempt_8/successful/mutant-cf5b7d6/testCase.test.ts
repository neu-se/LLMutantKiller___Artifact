import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("dirty database row processing return value", () => {
  const testFile = path.join(__dirname, "test.dirty");
  const testData = '{"key":"test","val":"data"}\n{"key":"another","val":"entry"}\n';

  beforeAll(() => {
    fs.writeFileSync(testFile, testData);
  });

  afterAll(() => {
    fs.unlinkSync(testFile);
  });

  it("should return empty string from row processing", (done) => {
    const db = new Dirty(testFile);
    let rowProcessingReturnValue: string | undefined;

    // Monkey-patch the forEach to capture return value
    const originalForEach = Array.prototype.forEach;
    Array.prototype.forEach = function(callback) {
      for (let i = 0; i < this.length; i++) {
        rowProcessingReturnValue = callback(this[i], i, this);
      }
    };

    db.on("load", (size) => {
      expect(rowProcessingReturnValue).toBe('');
      expect(size).toBe(2);
      expect(db.get("test")).toBe("data");
      expect(db.get("another")).toBe("entry");

      // Restore original
      Array.prototype.forEach = originalForEach;
      done();
    });
  });
});