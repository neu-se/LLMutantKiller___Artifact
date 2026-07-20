import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe("Dirty drain event via write stream backpressure", () => {
  it("should emit drain event when write stream drains after backpressure and queue is empty", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `test-dirty-bp-${process.pid}-${Date.now()}.db`);

    try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }

    const db = new Dirty(dbPath);
    let resolved = false;

    const cleanup = () => {
      try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
    };

    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        cleanup();
        done(new Error("Timed out: 'drain' event never fired - mutation likely changed emit('drain') to emit('')"));
      }
    }, 6000);

    db.on("load", () => {
      // We need to trigger write stream backpressure.
      // Write many large records simultaneously so that the write stream
      // returns false (backpressure), setting _waitForDrain = true.
      // When the stream drains and queue is empty, the original emits 'drain'
      // but the mutant emits '' instead.

      // Use a very small highWaterMark by monkey-patching the write stream
      // to simulate backpressure reliably.
      // Access the internal write stream and lower its highWaterMark.
      const writeStream = (db as any)._writeStream;
      // Force the stream to think it's full by overriding writableHighWaterMark
      Object.defineProperty(writeStream, 'writableHighWaterMark', { value: 1, configurable: true });

      let drainEmitted = false;

      db.once("drain", () => {
        drainEmitted = true;
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          cleanup();
          done();
        }
      });

      // Write a large value - with lowered highWaterMark, this should trigger backpressure
      const largeValue = "A".repeat(1024 * 16);
      db.set("key1", largeValue);
    });

    db.on("error", (err: Error) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        cleanup();
        done(err);
      }
    });
  });
});