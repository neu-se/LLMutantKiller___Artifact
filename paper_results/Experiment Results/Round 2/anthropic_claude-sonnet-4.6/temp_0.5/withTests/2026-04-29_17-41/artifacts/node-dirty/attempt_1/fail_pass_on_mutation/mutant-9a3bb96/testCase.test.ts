import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("Dirty close() waits for pending writes", () => {
  it("should persist data written before close() is called", (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-close-${Date.now()}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new (Dirty as any)(file);

    db.on("load", () => {
      // Set a value and immediately call close without waiting for drain
      db.set("testKey", "testValue");
      // Close immediately - original code should wait for drain first
      db.close();
    });

    db.on("write_close", () => {
      // After write stream closes, reload the database and verify data was persisted
      const db2 = new (Dirty as any)(file);
      db2.on("load", (length: number) => {
        try {
          expect(length).toBe(1);
          expect(db2.get("testKey")).toBe("testValue");
          // Cleanup
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        } catch (err) {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done(err);
        }
      });
      db2.on("error", (err: Error) => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done(err);
      });
    });

    db.on("error", (err: Error) => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(err);
    });
  });
});