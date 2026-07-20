import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("Dirty close() with pending writes", () => {
  it("should wait for pending writes to complete before closing", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);

    // Clean up any existing file
    try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }

    const db = new Dirty(dbPath);

    db.on("load", () => {
      // Set multiple values to create pending writes in the queue
      db.set("key1", { value: "hello" });
      db.set("key2", { value: "world" });
      db.set("key3", { value: "test" });

      // Call close() immediately - with original code, it should wait for drain
      // With mutated code (if false), it closes immediately without waiting
      db.close();

      // After close completes (write_close event), verify the data was written
      db.once("write_close", () => {
        // Now reload the database from disk to verify data was persisted
        const db2 = new Dirty(dbPath);
        db2.on("load", (count) => {
          // With original code: all 3 keys should be persisted
          // With mutated code: close() doesn't wait for drain, stream may close before writes complete
          try {
            expect(count).toBe(3);
            expect(db2.get("key1")).toEqual({ value: "hello" });
            expect(db2.get("key2")).toEqual({ value: "world" });
            expect(db2.get("key3")).toEqual({ value: "test" });
            db2.close();
            db2.once("write_close", () => {
              try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
              done();
            });
          } catch (err) {
            db2.close();
            try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
            done(err);
          }
        });
        db2.on("error", (err) => {
          try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
          done(err);
        });
      });
    });

    db.on("error", (err) => {
      try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
      done(err);
    });
  });
});