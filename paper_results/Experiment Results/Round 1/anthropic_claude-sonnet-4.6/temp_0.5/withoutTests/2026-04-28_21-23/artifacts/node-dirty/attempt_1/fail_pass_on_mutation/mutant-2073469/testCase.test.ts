import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("Dirty drain event", () => {
  it("should emit drain event after writing to disk when write stream drains", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `test-dirty-drain-${Date.now()}.db`);

    // Clean up any existing file
    try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }

    const db = new Dirty(dbPath);

    db.on("load", () => {
      // Set a value and listen for drain
      db.on("drain", () => {
        // Clean up
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done();
      });

      // Write enough data to potentially trigger a write stream drain
      // We need to write data that causes the write stream to buffer and then drain
      const largeValue = "x".repeat(1024 * 64); // 64KB to trigger backpressure
      
      let drainCount = 0;
      const totalWrites = 10;
      
      // Remove the listener we just added and use a different approach
      db.removeAllListeners("drain");
      
      let resolved = false;
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
          done(new Error("Timed out waiting for drain event"));
        }
      }, 5000);

      db.once("drain", () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          db.close();
          // Give close a moment then clean up
          setTimeout(() => {
            try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
            done();
          }, 100);
        }
      });

      // Write data with a callback to ensure we trigger the drain path
      db.set("key1", largeValue, () => {});
    });

    db.on("error", (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
      done(err);
    });
  });
});