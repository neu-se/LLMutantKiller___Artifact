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
      db.set("test", "value", () => {
        db.on("drain", () => {
          try {
            const content = fs.readFileSync(testFile, "utf-8");
            // Check that the content is valid UTF-8 and contains expected data
            expect(content).toContain("test");
            expect(content).toContain("value");
            // This will fail if encoding is empty string as the content won't be properly decoded
            expect(() => JSON.parse(content.trim())).not.toThrow();
            done();
          } catch (err) {
            done(err);
          }
        });
      });
    });
  });
});