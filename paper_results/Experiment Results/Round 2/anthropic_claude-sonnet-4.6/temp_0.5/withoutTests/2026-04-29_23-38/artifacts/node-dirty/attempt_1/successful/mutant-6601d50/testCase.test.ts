import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

describe("Dirty close() with pending queue", () => {
  it("should eventually close the write stream after draining pending writes", (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.db`);
    
    const db = new Dirty(tmpFile);
    
    db.on("load", () => {
      // Set a value to add to the queue
      db.set("key1", { value: "test1" });
      db.set("key2", { value: "test2" });
      
      // Call close() - with pending items in queue, it should wait for drain
      // then close. In original code, it listens on 'drain' event.
      // In mutated code, it listens on '' event which never fires.
      db.close();
      
      // The write_close event should fire after close completes
      db.on("write_close", () => {
        // Clean up
        try {
          fs.unlinkSync(tmpFile);
        } catch (e) {
          // ignore cleanup errors
        }
        done();
      });
    });
    
    // Set a timeout to fail the test if close never completes (mutant behavior)
    const timeout = setTimeout(() => {
      try {
        fs.unlinkSync(tmpFile);
      } catch (e) {
        // ignore
      }
      done(new Error("Timed out waiting for write_close - close() never completed"));
    }, 3000);
    
    // Clear timeout if done is called
    const originalDone = done;
    // We need to clear the timeout when done is called successfully
    db.on("write_close", () => {
      clearTimeout(timeout);
    });
  });
});