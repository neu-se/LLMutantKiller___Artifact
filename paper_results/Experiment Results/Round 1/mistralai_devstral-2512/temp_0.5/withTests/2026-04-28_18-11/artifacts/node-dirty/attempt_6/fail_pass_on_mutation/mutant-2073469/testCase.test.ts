import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("drain event emission test", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");
  let db: Dirty;
  let eventNames: string[] = [];

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit exactly 'drain' event when writes complete", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Override emit to capture all event names
      const originalEmit = db.emit.bind(db);
      db.emit = (event: string, ...args: any[]) => {
        eventNames.push(event);
        return originalEmit(event, ...args);
      };

      db.set("key1", "value1");
      db.set("key2", "value2");

      setTimeout(() => {
        expect(eventNames).toContain("drain");
        expect(eventNames).not.toContain("");
        done();
      }, 100);
    });
  });
});