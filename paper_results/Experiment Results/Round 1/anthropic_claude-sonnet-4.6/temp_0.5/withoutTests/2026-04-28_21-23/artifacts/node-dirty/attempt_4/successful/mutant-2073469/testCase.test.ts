import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe("Dirty drain event via write stream backpressure path", () => {
  it("should emit drain via the write stream drain handler when backpressure occurs", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `test-dirty-drain-path-${process.pid}-${Date.now()}.db`);

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
        done(new Error("Timed out: drain event never fired"));
      }
    }, 6000);

    db.on("load", () => {
      const writeStream = (db as any)._writeStream;
      let intercepted = false;

      writeStream.write = function(data: any, cb: any) {
        if (!intercepted) {
          intercepted = true;
          // Simulate: write completes (call cb), _inFlightWrites goes to 0,
          // but _waitForDrain is true so write callback won't emit drain.
          // Then stream drain fires -> should emit 'drain' (original) or '' (mutant)
          
          // Step 1: call cb synchronously so _inFlightWrites decrements to 0
          // but _waitForDrain will be true (we return false below)
          // Actually cb is called async by the real stream, so we need to simulate:
          // - return false (sets _waitForDrain = true)
          // - cb fires (decrements _inFlightWrites, but _waitForDrain=true so no drain emit)
          // - stream drain fires (queue empty, _inFlightWrites=0, emit drain)
          
          // Call cb after a tick (simulating async write completion)
          setImmediate(() => {
            cb(null); // _inFlightWrites goes to 0, but _waitForDrain=true, no drain emit
            // Now emit stream drain - queue empty, _inFlightWrites=0
            // Original emits 'drain', mutant emits ''
            setImmediate(() => {
              writeStream.emit('drain');
            });
          });
        }
        return false; // force _waitForDrain = true
      };

      db.once("drain", () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          cleanup();
          done();
        }
      });

      db.set("key1", { value: "test" });
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