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
            // Read the file as binary buffer to check actual bytes written
            const buffer = fs.readFileSync(testFile);
            const content = buffer.toString('utf-8');
            const expected = `{"key":"test","val":"value"}\n`;

            // Verify the content matches exactly
            expect(content).toBe(expected);

            // Additional check: verify the buffer length matches expected UTF-8 encoding
            const expectedBuffer = Buffer.from(expected, 'utf-8');
            expect(buffer.length).toBe(expectedBuffer.length);

            done();
          } catch (err) {
            done(err);
          }
        });
      });
    });
  }, 10000);
});