import Dirty from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { join } from "path";
import { tmpdir } from "os";
import { existsSync, unlinkSync } from "fs";

describe("Dirty", () => {
  it("emits error event when write fails and key has no callbacks", (done) => {
    const dbPath = join(tmpdir(), `dirty-test-${process.pid}.db`);
    const db = new Dirty(dbPath) as any;

    db.on("load", () => {
      const errors: Error[] = [];
      db.on("error", (err: Error) => errors.push(err));

      // Wait for write stream to be ready, then patch it
      const ws = db._writeStream;

      // Override write to simulate a write error via callback
      ws.write = (_data: any, _enc: any, cb?: Function) => {
        const callback = typeof _enc === "function" ? _enc : cb;
        if (callback) {
          process.nextTick(() => (callback as Function)(new Error("simulated write error")));
        }
        return false;
      };

      // Manually set up the queue with an empty callbacks array (no callback provided)
      // This simulates calling db.set("k", "v") without a callback
      db._data.set("k", "v");
      db._queue.set("k", []); // empty cbs - !cbs.length is true
      db._waitForDrain = false;
      db._inFlightWrites = 0;

      db._flush();

      setTimeout(() => {
        expect(errors.length).toBeGreaterThan(0);
        try {
          if (existsSync(dbPath)) unlinkSync(dbPath);
        } catch {}
        done();
      }, 500);
    });
  });
});