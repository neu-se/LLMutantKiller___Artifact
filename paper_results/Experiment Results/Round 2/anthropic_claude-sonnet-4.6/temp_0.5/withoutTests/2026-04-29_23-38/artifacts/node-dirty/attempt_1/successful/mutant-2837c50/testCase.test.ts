import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("Dirty close with pending writes", () => {
  it("should close the write stream after drain when close() is called with pending writes", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 1000000)}.db`);

    const db = new Dirty(dbPath);

    db.on("load", () => {
      // Set a value to create a pending write
      db.set("key1", { value: "test" });

      // Call close() while there may be pending writes or in-flight writes
      // The close() method should register a once('drain') listener that calls close() again
      db.close();

      // Listen for write_close - this should fire if close() properly re-calls itself on drain
      const timeout = setTimeout(() => {
        // Clean up
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done(new Error("write_close event was never emitted - close() did not complete after drain"));
      }, 3000);

      db.on("write_close", () => {
        clearTimeout(timeout);
        // Clean up
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done();
      });
    });

    db.on("error", (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
      done(err);
    });
  });
});