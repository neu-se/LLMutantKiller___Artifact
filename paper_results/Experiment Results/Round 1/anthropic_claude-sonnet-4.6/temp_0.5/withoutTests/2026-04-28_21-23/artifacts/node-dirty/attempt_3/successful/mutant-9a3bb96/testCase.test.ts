import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as os from "os";
import * as path from "path";
import * as fs from "fs";

describe("Dirty close() with pending queue items", () => {
  it("should persist all queued items when close() is called after write buffer overflow", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}.db`);
    try { fs.unlinkSync(dbPath); } catch (_) {}

    const db = new Dirty(dbPath);
    db.on("error", () => {});

    db.on("load", () => {
      // Write a large value (100KB > 64KB highWaterMark for fs.WriteStream)
      // to cause _waitForDrain = true
      db.set("bigKey", { data: "x".repeat(100000) });

      // Since _waitForDrain = true, _flush() returns early for this call
      // criticalKey stays in _queue
      db.set("criticalKey", { value: "must-be-persisted" });

      // close() when _queue.size > 0:
      // Original: defers close until drain, then flushes criticalKey to disk
      // Mutated: immediately ends stream, criticalKey is never written
      db.close();

      db.once("write_close", () => {
        const db2 = new Dirty(dbPath);
        db2.on("error", () => {});
        db2.on("load", () => {
          const criticalVal = db2.get("criticalKey");
          db2.close();
          db2.once("write_close", () => {
            try { fs.unlinkSync(dbPath); } catch (_) {}
            try {
              expect(criticalVal).toEqual({ value: "must-be-persisted" });
              done();
            } catch (err) {
              done(err);
            }
          });
        });
      });
    });
  }, 10000);
});