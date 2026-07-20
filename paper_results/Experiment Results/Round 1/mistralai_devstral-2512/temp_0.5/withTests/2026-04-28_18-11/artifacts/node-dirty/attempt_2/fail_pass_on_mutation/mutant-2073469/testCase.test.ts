import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("drain event emission test", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");
  let db: Dirty;
  let drainEventFired = false;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit 'drain' event with correct event name", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      db.set("key1", "value1");
      db.set("key2", "value2");

      db.on("drain", () => {
        drainEventFired = true;
      });

      setTimeout(() => {
        expect(drainEventFired).toBe(true);
        done();
      }, 100);
    });
  });
});