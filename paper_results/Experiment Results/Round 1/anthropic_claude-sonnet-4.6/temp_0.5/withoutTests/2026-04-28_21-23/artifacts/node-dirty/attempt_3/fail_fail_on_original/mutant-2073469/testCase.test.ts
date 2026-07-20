import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe("Dirty drain event via write stream backpressure path", () => {
  it("should emit drain via the write stream drain handler when _waitForDrain was true", (done) => {
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
        done(new Error("Timed out: drain event never fired - mutation likely changed emit('drain') to emit('')"));
      }
    }, 6000);

    db.on("load", () => {
      const writeStream = (db as any)._writeStream;
      const originalWrite = writeStream.write.bind(writeStream);

      // We intercept write to:
      // 1. Delay the write callback until after the stream drain event fires
      // 2. Return false to force _waitForDrain = true
      writeStream.write = function(data: any, cb: any) {
        // Call original but intercept the callback
        // We delay the callback so that _inFlightWrites stays > 0 when stream drain fires
        // Actually we want _inFlightWrites <= 0 when stream drain fires
        // The write callback decrements _inFlightWrites
        // If we let the callback fire normally but return false, 
        // _waitForDrain=true means write callback won't emit drain
        // Then stream drain fires: queue empty, _inFlightWrites should be 0 -> emit drain
        
        // Just return false to force backpressure
        originalWrite(data, cb);
        return false;
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