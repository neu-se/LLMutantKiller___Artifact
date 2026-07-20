import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

describe("Dirty close() with pending writes", () => {
  it("should close the write stream after drain when close() is called with pending writes", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.db`);

    const db = new Dirty(dbPath);

    db.on("load", () => {
      // Set a value to create a pending write
      db.set("key1", { value: "test" });

      // Immediately call close() - this should register a once('drain') listener
      // that calls close() again after drain
      db.close();

      // Listen for write_close event which fires when the write stream is actually closed
      // In the original code: close() -> once('drain', close) -> write stream ends -> write_close
      // In the mutated code: close() -> once('drain', undefined) -> write stream never closes -> write_close never fires
      const timeout = setTimeout(() => {
        // Clean up
        try { fs.unlinkSync(dbPath); } catch (e) {}
        done(new Error("write_close event never fired - close() did not complete after drain"));
      }, 3000);

      db.on("write_close", () => {
        clearTimeout(timeout);
        try { fs.unlinkSync(dbPath); } catch (e) {}
        done();
      });
    });

    db.on("error", (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (e) {}
      done(err);
    });
  });
});