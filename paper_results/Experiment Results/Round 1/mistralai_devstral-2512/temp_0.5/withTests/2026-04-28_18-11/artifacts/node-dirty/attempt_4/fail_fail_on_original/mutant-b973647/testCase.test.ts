import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("error event emission", () => {
  const testFile = path.join(__dirname, "test-error.dirty");
  let db: any;
  let errorEventName: string | null = null;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.rmSync(testFile, { recursive: true, force: true });
    }
    errorEventName = null;
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.rmSync(testFile, { recursive: true, force: true });
    }
  });

  it("should emit 'error' event with correct event name when file read fails", (done) => {
    // Create a directory with the same name as the file to trigger an error
    fs.mkdirSync(testFile);

    db = new Dirty(testFile);

    db.on("error", (err: Error) => {
      errorEventName = "error";
      expect(err).toBeInstanceOf(Error);
      expect(errorEventName).toBe("error");
      done();
    });

    // Also listen for empty string event to detect mutation
    db.on("", (err: Error) => {
      errorEventName = "";
      expect(errorEventName).toBe("error"); // This will fail if mutation is present
      done();
    });
  });
});