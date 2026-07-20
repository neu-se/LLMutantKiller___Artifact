import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("drain event emission test", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");
  let db: Dirty;
  let drainEventReceived = false;
  let emptyEventReceived = false;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit 'drain' event and not empty string event when writes complete", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      db.set("key1", "value1", () => {
        db.set("key2", "value2", () => {
          // Force flush by setting more data than buffer can handle
          for (let i = 0; i < 100; i++) {
            db.set(`key${i}`, `value${i}`);
          }

          db.on("drain", () => {
            drainEventReceived = true;
          });

          // Check if empty event was emitted (mutated version)
          db.on("", () => {
            emptyEventReceived = true;
          });

          setTimeout(() => {
            expect(drainEventReceived).toBe(true);
            expect(emptyEventReceived).toBe(false);
            done();
          }, 200);
        });
      });
    });
  });
});