import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("drain event emission condition", () => {
  const testFile = path.join(__dirname, "test-drain-condition.dirty");

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it("should emit drain event when inFlightWrites is zero and queue is empty", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      let drainCount = 0;
      db.on("drain", () => {
        drainCount++;
      });

      // First write
      db.set("key1", "value1", () => {
        // After first write completes, check drain count
        setImmediate(() => {
          expect(drainCount).toBe(1);

          // Second write
          db.set("key2", "value2", () => {
            // After second write completes, check drain count again
            setImmediate(() => {
              expect(drainCount).toBe(2);
              done();
            });
          });
        });
      });
    });
  });
});