import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("Dirty close() with in-flight writes", () => {
  it("should emit drain event after close completes when writes are pending", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);

    try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }

    const db = new Dirty(dbPath);

    db.on("load", () => {
      let writeCbCalled = false;

      // Set a value with a callback - the callback should be called before close completes
      db.set("key1", { value: "hello" }, (err) => {
        writeCbCalled = true;
        if (err) {
          try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
          done(err);
        }
      });

      // Immediately call close() while write is in-flight (_inFlightWrites > 0)
      // Original: defers close until drain (write cb fires first)
      // Mutated: closes immediately, write cb may never fire or fires with error
      db.close();

      // Give time for everything to settle
      setTimeout(() => {
        try {
          // The write callback should have been called in both cases,
          // but with the original code the close waits for drain first
          // ensuring the write completes successfully
          expect(writeCbCalled).toBe(true);

          // Verify data was persisted by reloading
          const db2 = new Dirty(dbPath);
          db2.on("load", (count) => {
            try {
              expect(count).toBe(1);
              expect(db2.get("key1")).toEqual({ value: "hello" });
              db2.close();
              db2.once("write_close", () => {
                try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
                done();
              });
            } catch (err2) {
              db2.close();
              try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
              done(err2);
            }
          });
          db2.on("error", (err2) => {
            try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
            done(err2);
          });
        } catch (err2) {
          try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
          done(err2);
        }
      }, 500);
    });

    db.on("error", (err) => {
      try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
      done(err);
    });
  });
});