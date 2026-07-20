import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("encoding mutation test", () => {
  const testFile = path.join(__dirname, "test-encoding.dirty");

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  });

  it("should write data with correct encoding", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      // Write data with special characters that would fail with empty encoding
      const specialValue = "test value with éñçöðïñğ";
      db.set("test", specialValue, () => {
        setTimeout(() => {
          try {
            const content = fs.readFileSync(testFile, "utf-8");
            const expected = `{"key":"test","val":"${specialValue}"}\n`;
            expect(content).toBe(expected);
            done();
          } catch (err) {
            done(err);
          }
        }, 500);
      });
    });
  });
});