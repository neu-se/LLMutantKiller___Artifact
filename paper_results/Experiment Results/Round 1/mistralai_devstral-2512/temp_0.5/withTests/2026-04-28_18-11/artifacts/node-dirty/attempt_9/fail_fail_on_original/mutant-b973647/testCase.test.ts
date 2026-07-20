import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("error event emission", () => {
  const testFile = path.join(__dirname, "test-error.dirty");
  let db: any;
  let errorEventReceived = false;
  let emptyEventReceived = false;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.rmSync(testFile, { recursive: true, force: true });
    }
    errorEventReceived = false;
    emptyEventReceived = false;
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.rmSync(testFile, { recursive: true, force: true });
    }
  });

  it("should emit 'error' event (not empty string) when file read fails", (done) => {
    // Create a directory with the same name as the file to trigger an error
    fs.mkdirSync(testFile);

    db = new Dirty(testFile);

    db.on("error", (err: Error) => {
      errorEventReceived = true;
    });

    db.on("", (err: Error) => {
      emptyEventReceived = true;
    });

    setTimeout(() => {
      expect(errorEventReceived).toBe(true);
      expect(emptyEventReceived).toBe(false);
      done();
    }, 100);
  });
});