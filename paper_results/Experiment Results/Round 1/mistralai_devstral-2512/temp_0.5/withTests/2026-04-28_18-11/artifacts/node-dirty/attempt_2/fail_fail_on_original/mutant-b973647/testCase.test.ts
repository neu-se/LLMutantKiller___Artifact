import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("error event emission", () => {
  const testFile = path.join(__dirname, "test-error.dirty");
  let db: any;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it("should emit 'error' event with correct event name when file read fails", (done) => {
    // Create a directory with the same name as the file to trigger an error
    fs.mkdirSync(testFile);

    db = new Dirty(testFile);

    let errorEventName: string | null = null;
    let errorReceived: Error | null = null;

    db.on("error", (err: Error) => {
      errorEventName = "error";
      errorReceived = err;
    });

    // Also listen for empty string event to detect mutation
    db.on("", (err: Error) => {
      errorEventName = "";
      errorReceived = err;
    });

    setTimeout(() => {
      expect(errorEventName).toBe("error");
      expect(errorReceived).toBeInstanceOf(Error);
      done();
    }, 100);
  });
});