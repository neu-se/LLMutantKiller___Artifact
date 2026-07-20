import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from "fs";
import path from "path";
import rimraf from "rimraf";

describe("Dirty database error handling", () => {
  const testDir = path.join(__dirname, "test-db");
  const dbPath = path.join(testDir, "test.db");

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it("should emit 'error' event when encountering corrupted data", (done) => {
    // Create a test database file with corrupted data
    const corruptedData = "invalid json data\n";
    fs.writeFileSync(dbPath, corruptedData);

    const db = new Dirty(dbPath);

    db.on("error", (error) => {
      expect(error.message).toContain("Could not load corrupted row");
      done();
    });

    // The mutation changes the event name from 'error' to an empty string,
    // so if the mutation is present, this test will fail because the 'error' event won't be emitted.
    // Instead, an event with an empty string name would be emitted, which we don't listen for.
    // This makes the test fail when run against the mutated code.
  });
});