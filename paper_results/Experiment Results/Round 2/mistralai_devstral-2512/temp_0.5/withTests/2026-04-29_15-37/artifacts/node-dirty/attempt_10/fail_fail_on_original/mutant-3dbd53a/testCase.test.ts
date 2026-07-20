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
      // Write data with emoji that would fail with empty encoding
      const emojiValue = "test 😀 value";
      db.set("test", emojiValue, () => {
        db.on("drain", () => {
          try {
            const content = fs.readFileSync(testFile, "utf-8");
            const expected = `{"key":"test","val":"${emojiValue}"}\n`;
            expect(content).toBe(expected);
            done();
          } catch (err) {
            done(err);
          }
        });
      });
    });
  });
});