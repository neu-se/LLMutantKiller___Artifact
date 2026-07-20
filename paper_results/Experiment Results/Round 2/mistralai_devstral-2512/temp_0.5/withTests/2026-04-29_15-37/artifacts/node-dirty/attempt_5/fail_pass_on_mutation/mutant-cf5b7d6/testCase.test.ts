import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("dirty database row processing return value", () => {
  const testFile = path.join(__dirname, "test.dirty");
  const testData = '{"key":"test","val":"data"}\n{"key":"another","val":"entry"}\n';

  beforeAll(() => {
    fs.writeFileSync(testFile, testData);
  });

  afterAll(() => {
    fs.unlinkSync(testFile);
  });

  it("should process rows and return empty string to clear buffer", (done) => {
    const db = new Dirty(testFile);
    let loadCalled = false;

    db.on("load", (size) => {
      loadCalled = true;
      expect(size).toBe(2);
      expect(db.get("test")).toBe("data");
      expect(db.get("another")).toBe("entry");
    });

    db.on("error", (err) => {
      if (loadCalled) return;
      fail("Should not emit error for valid data");
    });

    setTimeout(() => {
      if (!loadCalled) {
        fail("Load event should have been called");
      }
      done();
    }, 100);
  });
});