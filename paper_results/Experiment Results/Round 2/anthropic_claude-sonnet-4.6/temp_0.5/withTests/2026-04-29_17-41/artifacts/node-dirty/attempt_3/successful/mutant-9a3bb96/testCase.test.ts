import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("Dirty close() with pending queue due to backpressure", () => {
  it("should wait for drain when queue has items due to backpressure before closing", (done) => {
    const file = path.join(os.tmpdir(), `dirty-backpressure-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const Dirty = require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js");
    const db = new Dirty(file);

    db.on("load", () => {
      // Write many items to trigger backpressure (_waitForDrain = true)
      // leaving items in _queue
      for (let i = 0; i < 10000; i++) {
        db.set(`key${i}`, `${'x'.repeat(1000)}`);
      }
      // Now close - if _queue.size > 0, original waits, mutated doesn't
      db.close();
    });

    db.on("write_close", () => {
      // Reload and check all data was persisted
      const db2 = new Dirty(file);
      db2.on("load", (length: number) => {
        try {
          expect(length).toBe(10000);
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