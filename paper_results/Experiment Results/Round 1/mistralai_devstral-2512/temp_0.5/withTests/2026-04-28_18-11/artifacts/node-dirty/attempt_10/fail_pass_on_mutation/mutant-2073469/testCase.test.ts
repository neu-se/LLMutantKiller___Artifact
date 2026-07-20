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
      // Intercept all events to detect mutation
      const originalEmit = db.emit.bind(db);
      db.emit = (event: string, ...args: any[]) => {
        eventNames.push(event);
        return originalEmit(event, ...args);
      };

      // Force multiple flushes by writing enough data
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      setTimeout(() => {
        // Verify drain was emitted and no empty string events
        const hasDrain = eventNames.includes("drain");
        const hasEmpty = eventNames.includes("");

        expect(hasDrain).toBe(true);
        expect(hasEmpty).toBe(false);
        done();
      }, 200);
    });
  });
});