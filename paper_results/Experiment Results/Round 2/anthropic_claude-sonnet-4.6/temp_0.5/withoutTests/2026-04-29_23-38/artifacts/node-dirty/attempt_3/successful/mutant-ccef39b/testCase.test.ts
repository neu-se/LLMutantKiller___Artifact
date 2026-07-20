import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

describe("Dirty close() mutation detection", () => {
  it("should register drain listener and return when queue has items but no in-flight writes", (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-close-drain-${process.pid}.db`);
    
    const db = new Dirty(tmpFile);
    
    db.on("load", () => {
      // Intercept _flush to prevent it from running
      const originalFlush = (db as any)._flush.bind(db);
      let flushBlocked = true;
      (db as any)._flush = function() {
        if (flushBlocked) return;
        originalFlush();
      };
      
      // Now set a value - _flush is blocked so queue accumulates
      db.set("key1", "value1");
      
      // State: _queue.size = 1, _inFlightWrites = 0
      // Unblock flush
      flushBlocked = false;
      
      // close() check:
      // Original: (1 || false) = true => waits for drain
      // Mutated:  (1 && false) = false => closes immediately
      
      // In original, close() will call this.once('drain', ...) and return
      // Then we need drain to fire, which requires _flush to run
      // But close() doesn't call _flush... 
      // So we need to trigger it another way
      
      // Actually: after close() returns (in original), we can manually trigger _flush
      db.close();
      
      // Trigger flush manually after close() has registered its drain listener
      originalFlush();
      
      db.once("write_close", () => {
        try {
          const content = fs.readFileSync(tmpFile, "utf-8");
          expect(content).toContain("key1");
          expect(content).toContain("value1");
        } finally {
          try { fs.unlinkSync(tmpFile); } catch (e) {}
        }
        done();
      });
    });
    
    db.on("error", (err: Error) => {
      try { fs.unlinkSync(tmpFile); } catch (e) {}
      done(err);
    });
  });
});