import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

describe("Dirty close() with in-flight writes", () => {
  it("should wait for in-flight writes to complete before closing when queue is empty but writes are in flight", (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.db`);
    
    const db = new Dirty(tmpFile);
    
    db.on("load", () => {
      let writeCallbackFired = false;
      
      // Set a value - this will flush immediately, creating an in-flight write
      // The write callback fires when the write completes
      db.set("testKey", { value: "testValue" }, (err: Error | null) => {
        writeCallbackFired = true;
      });
      
      // Immediately call close() - at this point:
      // - _queue.size is 0 (already flushed by _flush())
      // - _inFlightWrites > 0 (write is in progress)
      // Original: (0 || inFlightWrites > 0) = true => waits for drain
      // Mutated:  (0 && inFlightWrites > 0) = false => closes immediately without waiting
      
      db.once("write_close", () => {
        // In the original code, write_close fires after drain (write completed)
        // In the mutated code, write_close may fire before the write callback
        // We verify the file has the data written correctly
        try {
          const content = fs.readFileSync(tmpFile, "utf-8");
          // The file should contain the written data
          expect(content).toContain("testKey");
          expect(content).toContain("testValue");
          
          // Clean up
          try { fs.unlinkSync(tmpFile); } catch (e) {}
          done();
        } catch (e) {
          try { fs.unlinkSync(tmpFile); } catch (e2) {}
          done(e);
        }
      });
      
      db.close();
    });
    
    db.on("error", (err: Error) => {
      try { fs.unlinkSync(tmpFile); } catch (e) {}
      done(err);
    });
  });
});