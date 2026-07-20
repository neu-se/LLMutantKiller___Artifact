import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("Dirty close() waits for in-flight writes", () => {
  it("should wait for in-flight writes before closing the write stream", (done) => {
    const file = path.join(os.tmpdir(), `dirty-close-inflight-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    // Use require to get the Dirty constructor
    const Dirty = require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js");

    const db = new Dirty(file);

    db.on("load", () => {
      // Set multiple values to increase chance of in-flight writes
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      // Immediately close - original waits for drain (in-flight writes > 0)
      // Mutated code skips the check and ends the stream immediately
      db.close();
    });

    // With original: write_close fires after all data is written
    // With mutated: write_close fires immediately, data may be lost
    db.on("write_close", () => {
      const db2 = new Dirty(file);
      db2.on("load", (length: number) => {
        try {
          expect(length).toBe(3);
          expect(db2.get("key1")).toBe("value1");
          expect(db2.get("key2")).toBe("value2");
          expect(db2.get("key3")).toBe("value3");
          db2.close();
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        } catch (err) {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done(err);
        }
      });
    });

    db.on("error", (err: Error) => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(err);
    });
  });
});