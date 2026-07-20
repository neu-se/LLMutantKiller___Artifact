import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe("Dirty corrupted row at end of db", () => {
  it("should emit 'error' event (not empty string event) when buffer has remaining content at stream end", (done) => {
    const dbPath = path.join(os.tmpdir(), `dirty-test-${process.pid}-${Date.now()}.db`);
    const validRow = JSON.stringify({ key: "k", val: "v" }) + "\n";
    // Write a file with a valid row followed by corrupted data (no trailing newline)
    fs.writeFileSync(dbPath, validRow + "corrupted-no-newline", "utf-8");

    const db = new Dirty(dbPath);
    let errorEventFired = false;
    let emptyStringEventFired = false;

    db.on("error", () => { errorEventFired = true; });
    db.on("", () => { emptyStringEventFired = true; });

    db.on("load", () => {
      try { fs.unlinkSync(dbPath); } catch (e) {}
      // Original emits 'error', mutant emits '' - so errorEventFired should be true on original
      expect(errorEventFired).toBe(true);
      expect(emptyStringEventFired).toBe(false);
      done();
    });
  });
});