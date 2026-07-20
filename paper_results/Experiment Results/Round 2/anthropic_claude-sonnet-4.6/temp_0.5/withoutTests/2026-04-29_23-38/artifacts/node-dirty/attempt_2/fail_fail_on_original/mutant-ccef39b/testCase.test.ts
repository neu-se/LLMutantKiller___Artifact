import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

describe("Dirty close() mutation detection", () => {
  it("should persist all queued data when close is called with pending queue items and no in-flight writes", (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-queue-close-${process.pid}.db`);
    
    const db = new Dirty(tmpFile);
    
    db.on("load", () => {
      // Pause the write stream so writes back up into the queue
      const writeStream = (db as any)._writeStream;
      writeStream.cork();
      
      // Set multiple keys - they go into queue, _flush is called but stream is corked
      // Actually cork/uncork is handled internally... let me use a different approach
      
      // Force _waitForDrain so queue accumulates
      (db as any)._waitForDrain = true;
      
      // Queue up items without flushing (since _waitForDrain = true, _flush returns early)
      const cbs1: Function[] = [];
      const cbs2: Function[] = [];
      (db as any)._data.set("alpha", "one");
      (db as any)._queue.set("alpha", cbs1);
      (db as any)._data.set("beta", "two");  
      (db as any)._queue.set("beta", cbs2);
      
      // Now _queue.size = 2, _inFlightWrites = 0
      // Reset _waitForDrain so close() can proceed to check condition
      (db as any)._waitForDrain = false;
      
      // In original: (2 || 0 > 0) = true => registers drain listener, returns
      // In mutated:  (2 && 0 > 0) = false => goes straight to close streams
      
      db.once("write_close", () => {
        const content = fs.readFileSync(tmpFile, "utf-8");
        try {
          expect(content).toContain("alpha");
          expect(content).toContain("beta");
        } finally {
          try { fs.unlinkSync(tmpFile); } catch (e) {}
        }
        done();
      });
      
      db.close();
    });
    
    db.on("error", (err: Error) => {
      try { fs.unlinkSync(tmpFile); } catch (e) {}
      done(err);
    });
  });
});